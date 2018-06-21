/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint browser: true, jquery: true */
/* globals define: false, require: false */


(function (f, define) {
    'use strict';
    define([
        // './vendor/localForage/localforage.js'
        // localforage without promises performs better
        // also promises in localforage display strange behaviours with jQuery deferred
        // and deferreds are better because they can notify progress callbacks for long operations like sync
        './vendor/localforage/localforage.nopromises.js',
        './common/window.assert.es6',
        './common/window.logger.es6'
    ], f);
})(function (lf) {

    /**
     * We will be closely monitoring browser database projects like
     * - https://github.com/Irrelon/ForerunnerDB
     * - https://github.com/techfort/LokiJS
     * - https://github.com/typicaljoe/taffydb
     * - https://pouchdb.com/ (more or less related to couchdb, not mongodb)
     * - http://brian.io/lawnchair/ (obsolete)
     *
     * My opinion at this stage is most of these projects are overkill for a couple of collections, e.g ForerunnerDB is 1MB+
     * and they provide no solution for the complex part which is the synchronization with mongoDB.
     * For anything serious the SQL-Lite cordova plugin is a better option unless one of these libraries finally provides synchronization with mongoDB out of the box.
     */

    'use strict';

    var localForage = lf || window.localforage;
    var pongodb = window.pongodb = window.pongodb || {};

    /* This function has too many statements. */
    /* jshint -W071 */

    (function ($, undefined) {

        var assert = window.assert;
        var logger = new window.Logger('app.db');
        var OBJECT = 'object';
        var STRING = 'string';
        var UNDEFINED = 'undefined';
        var MACHINE_POS = 8;
        var MACHINE_ID = '000000';
        var RX_MONGODB_ID = /^[0-9a-f]{24}$/;
        var META = '__meta__';
        var VERSION = 'version';
        var VERSION_000 = '0.0.0';
        var NOT_IMPLEMENTED = 'Not yet implemented';
        var TRIGGER = {
            INSERT: 'insert',
            UPDATE: 'update',
            REMOVE: 'remove'
        };


        /**
         * Utility functions
         * @type {{}}
         */
        pongodb.util = {

            /**
             * Escape string to be passed to RegExp
             * @see https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
             * @see https://github.com/lodash/lodash/blob/master/escapeRegExp.js
             * @param str
             */
            escapeRegExp: function (str) {
                // return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                return str.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
            },

            /**
             * Compare semantic versions (either directly or as a _version property of an object)
             * @see: https://github.com/substack/semver-compare/blob/master/index.js
             * @param a
             * @param b
             * @returns {number}
             */
            compareVersions: function(a, b) {
                // Get _version as an object property
                var va = $.type(a) === OBJECT ? a._version : a;
                var vb = $.type(b) === OBJECT ? b._version : b;
                // Remove `v` prefix if any
                va = va.charAt(0) === 'v' ? va.substr(1) : va;
                vb = vb.charAt(0) === 'v' ? vb.substr(1) : vb;
                var pa = va.split('.');
                var pb = vb.split('.');
                for (var i = 0; i < 3; i++) {
                    var na = parseInt(pa[i], 10);
                    var nb = parseInt(pb[i], 10);
                    if (na > nb) { return 1; }
                    if (nb > na) { return -1; }
                    if (!isNaN(na) && isNaN(nb)) { return 1; }
                    if (isNaN(na) && !isNaN(nb)) { return -1; }
                }
                return 0;
            },

            /* Blocks are nested too deeply. */
            /* jshint -W073 */

            /*  This function's cyclomatic complexity is too high.  */
            /* jshint -W074 */

            /**
             * Match a doc to a query
             * @param query
             * @param doc
             * @param textFields for text searches
             */
            match: function (query, doc, textFields) {
                // TODO: We are missing $and and $or
                // Note that kendo UI builds a function with eval (although eval is evil)
                assert.typeOrUndef(OBJECT, query, assert.format(assert.messages.typeOrUndef.default, 'query', OBJECT));
                assert.type(OBJECT, doc, assert.format(assert.messages.type.default, 'doc', OBJECT));
                var match = true;
                if ($.type(query) === OBJECT) {
                    for (var prop in query) {
                        if (prop && query.hasOwnProperty(prop)) {
                            var path = prop.split('.');
                            var value = doc;
                            while (path.length > 0) {
                                value = value && value[path[0]];
                                path.shift();
                            }
                            var criterion = query[prop];
                            if (criterion instanceof RegExp) {
                                match = match && criterion.test(value);
                            } else if ($.type(criterion) === OBJECT) {
                                for (var operator in criterion) {
                                    if (criterion.hasOwnProperty(operator)) {
                                        // @see http://docs.mongodb.org/manual/reference/operator/query/
                                        switch (operator) {
                                            case '$eq':
                                                match = match && (value === criterion[operator]);
                                                break;
                                            case '$gt':
                                                match = match && (value > criterion[operator]);
                                                break;
                                            case '$gte':
                                                match = match && (value >= criterion[operator]);
                                                break;
                                            case '$lt':
                                                match = match && (value < criterion[operator]);
                                                break;
                                            case '$lte':
                                                match = match && (value <= criterion[operator]);
                                                break;
                                            case '$ne':
                                                match = match && (value !== criterion[operator]);
                                                break;
                                            case '$regex':
                                                match = match && criterion[operator].test(value);
                                                break;
                                            case '$search':
                                                match = match && pongodb.util.search(criterion[operator], doc, textFields);
                                                break;
                                        }
                                    }
                                    if (!match) {
                                        // window.alert(prop + ' ' + operator + ' ' + criterion[operator]);
                                        break;
                                    }
                                }
                            } else {
                                match = match && (value === criterion);
                            }
                        }
                        if (!match) {
                            break;
                        }
                    }
                }
                return match;
            },

            /* jshint +W074 */
            /* jshint +W073 */

            /**
             * Search for str in a doc's indexed fields
             * @param str
             * @param doc
             * @param textFields
             * @returns {boolean}
             */
            search: function (str, doc, textFields) {
                assert.type(STRING, str, assert.format(assert.messages.type.default, 'str', STRING));
                assert.isPlainObject(doc, assert.format(assert.messages.isPlainObject.default, 'doc'));
                assert.isArray(textFields, assert.format(assert.messages.isArray.default, 'textFields'));
                if (str.length < 1) {
                    return true;
                }
                // TODO: consider str as a sum of words (build an array split on spaces)
                var match = false;
                for (var i = 0, length = textFields.length; i < length; i++) {
                    var prop = textFields[i];
                    var path = prop.split('.');
                    var value = doc;
                    while (path.length > 0) {
                        value = value && value[path[0]];
                        path.shift();
                    }
                    if (Array.isArray(value)) { // like summary tags
                        for (var j = 0, count = value.length; j < count; j++) {
                            match = match || new RegExp(pongodb.util.escapeRegExp(str), 'i').test(value[j]);
                            if (match) {
                                break;
                            }
                        }
                    } else if ($.type(value) === STRING) {
                        match = match || new RegExp(pongodb.util.escapeRegExp(str), 'i').test(value);
                    }
                    if (match) {
                        break;
                    }
                }
                return match;
            },

            /**
             * Convert a Kendo UI filter to a MongoDB query
             * TODO: Not recursive at this stage and only logic 'and' because match is not recursive either
             * TODO This conversion is inefficient:https://github.com/kidoju/Kidoju-Mobile/issues/144
             * TODO: @see https://docs.telerik.com/kendo-ui/api/javascript/data/query especially how they convert filter into a test function
             * @param filter
             */
            convertFilter: function (filter) { // TODO text index + item.field in the form a.b like author.userId
                assert.equal('and', filter.logic, assert.format(assert.messages.equal.default, 'filter.logic', 'and'));
                assert.isArray(filter.filters, assert.format(assert.messages.isArray.default, 'assert.messages.equal.default', 'filter.filters'));
                var query = {};
                for (var i = 0, length = filter.filters.length; i < length; i++) {
                    var item = filter.filters[i];
                    var op = {};
                    if (item.field === '$text' && item.operator === 'eq' && $.type(item.value) !== UNDEFINED) {
                        // Note: we do not handle item.ignoreCase
                        op.$text = { $search: item.value };
                    } else if ($.type(item.field) === STRING && $.type(item.value) !== UNDEFINED) {
                        switch (item.operator) {
                            case 'eq':
                                op[item.field] = { $eq: item.value };
                                break;
                            case 'neq':
                                op[item.field] = { $ne: item.value };
                                break;
                            case 'lt':
                                op[item.field] = { $lt: item.value };
                                break;
                            case 'lte':
                                op[item.field] = { $lte: item.value };
                                break;
                            case 'gt':
                                op[item.field] = { $gt: item.value };
                                break;
                            case 'gte':
                                op[item.field] = { $gte: item.value };
                                break;
                            case 'flags': // Not a Kendo UI operator
                                op[item.field] = { $bitsAnySet: item.value };
                                break;
                            case 'startswith':
                                op[item.field] = { $regex: '^' + item.value, $options: 'i' };
                                break;
                            case 'endswith':
                                op[item.field] = { $regex: item.value + '$', $options: 'i' };
                                break;
                            case 'contains':
                                op[item.field] = { $regex: item.value, $options: 'i' };
                                break;
                            case 'doesnotcontain':
                                // https://docs.mongodb.com/manual/reference/operator/query/not/
                                // http://stackoverflow.com/questions/20175122/how-can-i-use-not-like-operator-in-mongodb
                                // op[item.field] = { $not: new RegExp(item.value, 'i') };
                                op[item.field] = { $regex: '^((?!' + item.value + ').)*$', $options: 'i' };
                                break;
                        }
                    }
                    // Note extend might not be the perfect choice because it would replace { a: 1 } with {a : 2 }
                    // matching all items where a is 2 instead of matching no items becuase a cannnot be bother 1 and 2
                    $.extend(query, op);
                }
                return query;
            },

            /**
             * Converts a Kendo UI sort to MongoDB sort options
             * TODO This conversion is inefficient:https://github.com/kidoju/Kidoju-Mobile/issues/144
             */
            convertSort: function (sort) {
                var ret;
                if ($.type(sort) === UNDEFINED || $.isEmptyObject(sort) || (Array.isArray(sort) && sort.length === 0)) {
                    return ret;
                }
                if ($.isPlainObject(sort) && $.type(sort.field) === STRING && $.type(sort.dir) === STRING) {
                    sort = [sort];
                }
                assert.isArray(sort, assert.format(assert.messages.isArray.default, sort));
                for (var i = 0, length = sort.length; i < length; i++) {
                    if ($.type(sort.field) === STRING && $.type(sort.dir) === STRING) {
                        ret = ret || {};
                        ret[field] = sort.dir === 'asc' ? 1 : -1;
                    }
                }
                return ret;
            }

        };

        /******************************************************************************************************
         * pongodb.ObjectId
         *****************************************************************************************************/

        /**
         * An ObjectId like MongoDB
         * @see https://docs.mongodb.com/manual/reference/method/ObjectId/
         * @param id
         * @constructor
         */
        var ObjectId = pongodb.ObjectId = function (id) {
            assert.ok($.type(id) === UNDEFINED || RX_MONGODB_ID.test(id), '`id` is expected to be an hexadecimal string with a length of 24 characters or undefined');
            /* jshint -W016 */
            function makeOne() {
                var epoch = (new Date().getTime() / 1000 | 0).toString(16);
                // Note: we are not using a processID, so random ID is 10 bytes instead of 6 bytes
                return epoch + MACHINE_ID + 'xxxxxxxxxx'.replace(/x/g, function () {
                        return (Math.random() * 16 | 0).toString(16);
                    }).toLowerCase();
            }
            /* jshint +W016 */
            this._id = id || makeOne();
        };

        /**
         * Convert a server id (sid) into a mobile id
         * @returns {boolean}
         */
        ObjectId.prototype.toMobileId = function () {
            return this._id.substr(0, MACHINE_POS) + MACHINE_ID + this._id.substr(MACHINE_POS + MACHINE_ID.length);
        };

        /**
         * Test whether the ObjectId is a mobile id (as opposed to a mongodb server id)
         * @returns {boolean}
         */
        ObjectId.prototype.isMobileId = function () {
            return this._id.substr(MACHINE_POS, MACHINE_ID.length) === MACHINE_ID;
        };

        /**
         * Get the ObjectId timestamp
         * @returns {Date}
         */
        ObjectId.prototype.getTimestamp = function () {
            return new Date(1000 * parseInt(this._id.substr(0, 8), 16));
        };

        /**
         * Get the 24-char hexadecimal value of the ObjectId
         * @returns {*}
         */
        ObjectId.prototype.toString = function () {
            return this._id;
        };

        /******************************************************************************************************
         * pongodb.Upgrade
         *****************************************************************************************************/

        /**
         * Collection
         * @param options
         * @constructor
         */
        var Collection = pongodb.Collection = function (options) {
            assert.isPlainObject(options, assert.format(assert.messages.isPlainObject.default, 'options'));
            assert.instanceof(Database, options.db, assert.format(assert.messages.instanceof.default, 'options.db', 'pongodb.Database'));
            assert.type(STRING, options.name, assert.format(assert.messages.isPlainObject.default, 'options.name', STRING));
            this._db = options.db;
            this._name = options.name;
            this._localForage = localForage.createInstance({
                name: this._db._name, // Database name
                storeName: options.name // Collection name
            });
            this._textFields = []; // for full text searches
            this._triggers = {
                insert: [],
                remove: [],
                update: []
            };
        };

        /**
         * Collection name
         * @returns {*|string}
         */
        Collection.prototype.name = function () {
            return this._name;
        };

        /**
         * Find (returns an array instead of a cursor in mongoDB)
         * Note: The order is determined by ObjectId which is random
         * @see https://docs.mongodb.com/manual/reference/method/db.collection.find/
         * @param query
         * @param projection // not implemented, for future use
         * @param breakOnFirst
         */
        Collection.prototype.find = function (query, projection, breakOnFirst) {
            assert.typeOrUndef(OBJECT, query, assert.format(assert.messages.typeOrUndef.default, 'query', OBJECT));
            var that = this;
            var idField = that._db._idField;
            var dfd = $.Deferred();
            if ($.type(query) === OBJECT && $.type(query[idField]) === STRING) {
                // We have an id to get straight to the document
                // https://localforage.github.io/localForage/#data-api-getitem
                that._localForage.getItem(query[idField], function (err, item) {
                    if (err) {
                        dfd.reject(err);
                    } else if (item) {
                        // If found, check that the entire query matches
                        if (!pongodb.util.match(query, item, that._textFields)) {
                            item = null;
                        }
                        dfd.resolve(item ? [item] : []);
                    } else {
                        dfd.resolve([]);
                    }
                });
            } else {
                // Without an id, we need to iterate
                // https://localforage.github.io/localForage/#data-api-length
                that._localForage.length(function (err, length) {
                    if (err) {
                        dfd.reject(err);
                    } else if (!length) {
                        // Without length, no need to iterate
                        dfd.resolve([]);
                    } else {
                        var found = [];
                        // https://localforage.github.io/localForage/#data-api-iterate
                        that._localForage.iterate(
                            function (item, key, index) {
                                if (pongodb.util.match(query, item, that._textFields)) {
                                    found.push(item);
                                }
                                if (breakOnFirst) {
                                    // return something to stop iterating
                                    return item;
                                }
                                dfd.notify({ index: index - 1, total: length }); // index starts at 1
                            },
                            function (err) {
                                if (err) {
                                    dfd.reject(err);
                                } else {
                                    dfd.resolve(found);
                                }
                            }
                        );
                    }
                });
            }
            return dfd.promise();
        };

        /**
         * FindOne
         * @see https://docs.mongodb.com/manual/reference/method/db.collection.findOne/
         * @param query
         * @param projection // not implemented, for future use
         */
        Collection.prototype.findOne = function (query, projection) {
            var dfd = $.Deferred();
            this.find(query, projection, true)
                .done(function (results) {
                    assert.isArray(results, assert.format(assert.messages.isArray.default, 'results'));
                    if (results.length) {
                        dfd.resolve(results[0]);
                    } else {
                        dfd.reject(new Error('Not found'));
                    }
                })
                .fail(dfd.reject);
            return dfd.promise();
        };

        /**
         * Count
         * @see https://docs.mongodb.com/manual/reference/method/db.collection.count/
         * @param query
         */
        Collection.prototype.count = function (query) {
            assert.typeOrUndef(OBJECT, query, assert.format(assert.messages.typeOrUndef.default, 'query', OBJECT));
            var that = this;
            var idField = that._db._idField;
            var count = 0;
            var dfd = $.Deferred();
            if ($.type(query) === OBJECT && $.type(query[idField]) === STRING) {
                // We have an id to get straight to the document
                // https://localforage.github.io/localForage/#data-api-getitem
                that._localForage.getItem(query[idField], function (err, item) {
                    if (err) {
                        dfd.reject(err);
                    } else if (item) {
                        // If found, check that the entire query matches
                        if (pongodb.util.match(query, item, that._textFields)) {
                            count++;
                        }
                        dfd.resolve(count); // 1
                    } else {
                        dfd.resolve(count); // 0
                    }
                });
            } else {
                // Without an id, we need to iterate
                // https://localforage.github.io/localForage/#data-api-length
                that._localForage.length(function (err, length) {
                    if (err) {
                        dfd.reject(err);
                    } else if (!length) {
                        // Without length, no need to iterate
                        dfd.resolve(count); // 0
                    } else {
                        // https://localforage.github.io/localForage/#data-api-iterate
                        that._localForage.iterate(
                            function (item, key, index) {
                                if (pongodb.util.match(query, item, that._textFields)) {
                                    count++;
                                }
                                dfd.notify({ index: index - 1, total: length }); // index starts at 1
                            },
                            function (err) {
                                if (err) {
                                    dfd.reject(err);
                                } else {
                                    dfd.resolve(count);
                                }
                            }
                        );
                    }
                });
            }
            return dfd.promise();
        };

        /**
         * Insert a document
         * @see https://docs.mongodb.com/manual/reference/method/db.collection.insert/
         * @param doc
         */
        Collection.prototype.insert = function (doc) {
            assert.type(OBJECT, doc, assert.format(assert.messages.type.default, 'doc', OBJECT));
            var that = this;
            var idField = that._db._idField;
            var dfd = $.Deferred();
            if (!doc[idField]) {
                // Insertion without an id requires that we create one
                doc[idField] = (new ObjectId()).toString();
                // https://localforage.github.io/localForage/#data-api-setitem
                that._localForage.setItem(doc[idField], doc, function (err, item) {
                    if (err) {
                        dfd.reject(err);
                    } else {
                        $.when.apply(that, that.triggers(TRIGGER.INSERT, item))
                            .done(function () {
                                dfd.resolve(item);
                            })
                            .fail(dfd.reject);
                    }
                });
            } else {
                // Insertion with an id requires that we check it does not already exist
                // https://localforage.github.io/localForage/#data-api-getitem
                that._localForage.getItem(doc[idField], function (err, item) {
                    if (err) {
                        dfd.reject(err);
                    } else if (item) {
                        dfd.reject(new Error('Duplicate ' + idField + ' `' + doc[idField] + '`'));
                    } else {
                        // https://localforage.github.io/localForage/#data-api-setitem
                        that._localForage.setItem(doc[idField], doc, function (err, item) {
                            if (err) {
                                dfd.reject(err);
                            } else {
                                $.when.apply(that, that.triggers(TRIGGER.INSERT, item))
                                    .done(function () {
                                        dfd.resolve(item);
                                    })
                                    .fail(dfd.reject);
                            }
                        });
                    }
                });
            }
            return dfd.promise();
        };

        /**
         * Update a set of documents
         * @see https://docs.mongodb.com/manual/reference/method/db.collection.update/
         * @param query
         * @param doc
         * @param options
         */
        Collection.prototype.update = function (query, doc, options) {
            assert.typeOrUndef(OBJECT, query, assert.format(assert.messages.typeOrUndef.default, 'query', OBJECT));
            assert.type(OBJECT, doc, assert.format(assert.messages.type.default, 'doc', OBJECT));
            var that = this;
            var idField = that._db._idField;
            var upsert = !!(options && options.upsert);
            var dfd = $.Deferred();
            if ($.type(doc[idField]) !== UNDEFINED && doc[idField] !== query[idField]) {
                dfd.reject(new Error('Cannot update ' + idField));
            } else if ($.type(query) === OBJECT && RX_MONGODB_ID.test(query[idField])) {
                // We have an id to get straight to the document
                // https://localforage.github.io/localForage/#data-api-getitem
                that._localForage.getItem(query[idField], function (err, item) {
                    if (err) {
                        dfd.reject(err);
                    } else if (item) {
                        // If found, check that the entire query matches
                        if (pongodb.util.match(query, item, that._textFields)) {
                            // https://localforage.github.io/localForage/#data-api-setitem
                            // TODO: consider what to do with update fields explicitly set to undefined, which $.extend ignores
                            that._localForage.setItem(item[idField], $.extend(true, item, doc), function(err, item) {
                                if (err) {
                                    dfd.reject(err);
                                } else {
                                    $.when.apply(that, that.triggers(TRIGGER.UPDATE, item))
                                        .done(function () {
                                            dfd.resolve({ nMatched: 1, nUpserted: 0, nModified: 1 });
                                        })
                                        .fail(dfd.reject);
                                }
                            });
                        } else {
                            // if not found simply return 0 modified documents
                            dfd.resolve({ nMatched: 0, nUpserted: 0, nModified: 0 });
                        }
                    } else if (upsert && $.type(query[idField]) === STRING) {
                        // The document does not exist, insert it with query[idField]
                        that._localForage.setItem(query[idField], $.extend(true, doc, query), function(err, item) {
                            if (err) {
                                dfd.reject(err);
                            } else {
                                $.when.apply(that, that.triggers(TRIGGER.UPDATE, item))
                                    .done(function () {
                                        dfd.resolve({ nMatched: 1, nUpserted: 1, nModified: 0 });
                                    })
                                    .fail(dfd.reject);
                            }
                        });
                    } else {
                        // If not found
                        dfd.resolve({ nMatched: 0, nUpserted: 0, nModified: 0 });
                    }
                });
            } else {
                // Without an id, we need to iterate but we do not upsert
                // https://localforage.github.io/localForage/#data-api-length
                that._localForage.length(function (err, length) {
                    if (err) {
                        dfd.reject(err);
                    } else if (!length) {
                        // Without length, no need to iterate
                        dfd.resolve({ nMatched: 0, nUpserted: 0, nModified: 0 });
                    } else {
                        var promises = [];
                        // https://localforage.github.io/localForage/#data-api-iterate
                        that._localForage.iterate(
                            function (item, key, index) {
                                if (pongodb.util.match(query, item, that._textFields)) {
                                    promises.push(function (obj) {
                                        var def = $.Deferred();
                                        // https://localforage.github.io/localForage/#data-api-setitem
                                        that._localForage.setItem(obj[idField], $.extend(true, obj, doc), function (err) { // }, doc) {
                                            if (err) {
                                                def.reject(err);
                                            } else {
                                                $.when.apply(that, that.triggers(TRIGGER.UPDATE, doc))
                                                    .done(def.resolve)
                                                    .fail(def.reject);
                                            }
                                        });
                                        return def.promise();
                                    }(item));
                                }
                                dfd.notify({ index: index - 1, total: length }); // index starts at 1
                            },
                            function (err) { // This is called at the end of the iteration
                                if (err) {
                                    dfd.reject(err);
                                } else {
                                    $.when.apply(that, promises)
                                        .done(function() {
                                            dfd.notify({ index: length - 1, total: length }); // Make sure we reach 100%
                                            // Note: Cannot upsert when query returns several documents => upsert requires an id
                                            dfd.resolve({ nMatched: length, nUpserted: 0, nModified: promises.length });
                                        })
                                        .fail(dfd.reject);
                                }
                            }
                        );
                    }
                });
            }
            return dfd.promise();
        };

        /**
         * Remove a set of documents
         * @see https://docs.mongodb.com/manual/reference/method/db.collection.remove/
         * @param query
         */
        Collection.prototype.remove = function (query) {
            // Note: if query is undefined, use Collection.prototype.clear
            // TODO: What if query is an empty object {}?
            assert.type(OBJECT, query, assert.format(assert.messages.type.default, 'query', OBJECT));
            var that = this;
            var idField = that._db._idField;
            var dfd = $.Deferred();
            if ($.type(query) === OBJECT && $.type(query[idField]) === STRING) {
                // We have an id to get straight to the document
                // RemoveItem is always successful even if the key is missing
                that._localForage.getItem(query[idField], function (err, item) {
                    if (err) {
                        dfd.reject(err);
                    } else if (item) {
                        // https://localforage.github.io/localForage/#data-api-removeitem
                        that._localForage.removeItem(query[idField], function (err, item) {
                            if (err) {
                                dfd.reject(err);
                            } else {
                                $.when.apply(that, that.triggers(TRIGGER.REMOVE, item))
                                    .done(function () {
                                        dfd.resolve({ nRemoved: 1 });
                                    })
                                    .fail(dfd.reject);
                            }
                        });
                    } else {
                        dfd.resolve({ nRemoved: 0 });
                    }
                });
            } else {
                // Without an id, we need to iterate
                // https://localforage.github.io/localForage/#data-api-length
                that._localForage.length(function (err, length) {
                    if (err) {
                        dfd.reject(err);
                    } else if (!length) {
                        // Without length, no need to iterate
                        dfd.resolve({ nRemoved : 0 });
                    } else {
                        var removals = {};
                        // https://localforage.github.io/localForage/#data-api-iterate
                        that._localForage.iterate(
                            function (item, key, index) {
                                if (pongodb.util.match(query, item, that._textFields)) {
                                    removals[key] = $.Deferred();
                                    // https://localforage.github.io/localForage/#data-api-removeitem
                                    that._localForage.removeItem(item[idField], function (err) {
                                        if (err) {
                                            return removals[key].reject(err); // return something to stop iterating
                                        } else {
                                            $.when.apply(that, that.triggers(TRIGGER.REMOVE, item))
                                                .done(function () {
                                                    removals[key].resolve();
                                                })
                                                .fail(removals[key].reject);
                                        }
                                    });
                                }
                                dfd.notify({ index: index - 1, total: length }); // index starts at 1
                            },
                            function (err) {
                                if (err) {
                                    dfd.reject(err);
                                }
                                // Note: we need the removals hash and the promises array
                                // because this success callback is executed before some
                                // of the removeItem callbacks in the iterate method
                                // These promises and $.when ensure all removals are completed
                                // before we return a count of removed items
                                // TODO: write concern errors - https://docs.mongodb.com/manual/reference/method/db.collection.remove/#write-concern-errors
                                // In other words how many items have been removed before an error occurred?
                                var count = Object.keys(removals).length;
                                var promises = [];
                                for (var key in removals) {
                                    if (removals.hasOwnProperty(key)) {
                                        promises.push(removals[key].promise());
                                    }
                                }
                                $.when.apply(that, promises)
                                    .done(function () {
                                        dfd.resolve({ nRemoved: count });
                                    })
                                    .fail(dfd.reject);
                            }
                        );
                    }
                });
            }
            return dfd.promise();
        };

        /**
         * Gets triggers as an array of promises
         * @param event
         * @param item
         */
        Collection.prototype.triggers = function (event, item) {
            var promises = [];
            var triggers = this._triggers[event];
            for (var i = 0, length = triggers.length; i < length; i ++) {
                promises.push(triggers[i](item));
            }
            return promises;
        };

        /**
         * Clear a collection
         * Note: not a mongoDB feature
         * @param options
         */
        Collection.prototype.clear = function () {
            var dfd = $.Deferred();
            // https://localforage.github.io/localForage/#data-api-clear
            this._localForage.clear(function (err) {
                if (err) {
                    dfd.reject(err);
                } else {
                    dfd.resolve();
                }
            });
            return dfd.promise();
        };

        /**
         * Drop a collection
         * @see https://docs.mongodb.com/manual/reference/command/drop/
         * @param name
         */
        Collection.prototype.drop = function () {
            // TODO as and when localForage implements it - see https://github.com/localForage/localForage/issues/620
            // Note: we could keep track of collections in the META table
            throw new Error(NOT_IMPLEMENTED);
        };

        /******************************************************************************************************
         * pongodb.Upgrade
         *****************************************************************************************************/

        /**
         * An upgrade is a series of migrations
         */
        var Upgrade = pongodb.Upgrade = function (options) {
            this._db = options.db;
            this._migrations = [];
        };

        /**
         * Push migration
         * @param migration
         */
        Upgrade.prototype.push = function (migration) {
            migration._db = this._db;
            this._migrations.push(migration);
        };

        /**
         * Execute upgrade (execute all migrations)
         */
        Upgrade.prototype.execute = function () {
            var that = this;
            var dfd = $.Deferred();
            that._db.version() // Read from storage
                .done(function (version) {
                    // Sort migrations by version number
                    var migrations = that._migrations.sort(pongodb.util.compareVersions);
                    // Find the next migration
                    var found = false;
                    for (var i = 0, length = migrations.length; i < length; i++) {
                        var migration = migrations[i];
                        if (pongodb.util.compareVersions(version, migration._version) < 0) {
                            found = true;
                            logger.info({
                                method: 'pongodb.Upgrade.execute',
                                message: 'Starting migration',
                                data: { version: migration._version }
                            });
                            migration.execute()
                                .progress(dfd.notify)
                                .done(function () {
                                    that._db.version(migration._version)
                                        .done(function () {
                                            logger.info({
                                                method: 'pongodb.Upgrade.execute',
                                                message: 'Completed migration',
                                                data: { version: migration._version }
                                            });
                                            // Use recursion to execute the following migration
                                            that.execute()
                                                .progress(dfd.notify)
                                                .done(dfd.resolve)
                                                .fail(dfd.reject);
                                        })
                                        .fail(dfd.reject); // Note: migrations need to be idempotent otherwise this could be a problem
                                })
                                .fail(dfd.reject);
                            break;
                        }
                    }
                    // Without migration to execute, we are done
                    if (!found) {
                        dfd.resolve();
                    }
                })
                .fail(dfd.reject);
            return dfd.promise();
        };

        /******************************************************************************************************
         * pongodb.Migration
         *****************************************************************************************************/

        /**
         * A migration progresses a database from one version to the next
         * IMPORTANT: Migrations need to be idempotent (can be executed any number of times)
         */
        var Migration = pongodb.Migration = function (options) {
            this._db = null;
            this._scripts = options.scripts || [];
            this._version = options.version || '0.0.1';
        };

        /**
         * Execute migration (execute all scripts)
         */
        Migration.prototype.execute = function () {
            var dfd = $.Deferred();
            var scripts = this._scripts;
            var promises = [];
            if (this._db instanceof Database) {
                for (var i = 0; i < scripts.length; i++) {
                    promises.push(scripts[i](this._db).progress(dfd.notify));
                }
            }
            $.when.apply(this, promises)
                .done(dfd.resolve)
                .fail(dfd.reject);
            return dfd.promise();
        };

        /******************************************************************************************************
         * pongodb.Database
         *****************************************************************************************************/

        /**
         * Database
         * @param options
         * @constructor
         */
        var Database = pongodb.Database = function (options) {
            assert.isPlainObject(options, assert.format(assert.messages.isPlainObject.default, 'options'));
            assert.type(STRING, options.name, assert.format(assert.messages.isPlainObject.default, 'options.name', STRING));
            assert.hasLength(options.name, assert.format(assert.messages.hasLength.default, 'options.name'));
            options.collections = options.collections || [];
            assert.isArray(options.collections, assert.format(assert.messages.isArray.default, 'db', 'options.collections'));

            this._idField = options.idField || 'id';
            this._name = options.name || 'pongodb';

            // Configure localForage default store name
            options.storeName = META;

            // Force the use of WEBSQL in iOS WKWebView because indexedDB does not work properly
            // if (!window.chrome && window.webkit && window.indexedDB) {
            //     options.driver = localForage.WEBSQL;
            // }

            localForage.config(options);
            /*
            localForage.config({
                driver      : localForage.WEBSQL, // Force WebSQL; same as using setDriver()
                name        : name,
                version     : version,
                size        : 4980736 // Size of database, in bytes. WebSQL-only for now.
                storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
                description : 'some description'
            });
            */

            // Add collections
            var collections = options.collections;
            for (var i = 0, length = collections.length; i < length; i++) {
                this[collections[i]] = new Collection({ db: this, name: collections[i] });
            }

            // Add upgrade
            this.upgrade = new Upgrade({ db: this });

            // We cannot set the database version in the initialization code
            // We need to run an upgrade to set the version number unless Database.prototype.version is called explicitly

        };

        /**
         * Database name
         * @returns {*|string}
         */
        Database.prototype.name = function () {
            return this._name;
        };

        /**
         * Version
         * @param value
         */
        Database.prototype.version = function (value) {
            var dfd = $.Deferred();
            if ($.type(value) === UNDEFINED) {
                localForage.getItem(VERSION, function (err, item) {
                    if (err) {
                        dfd.reject(err);
                    } else if ($.type(item) === STRING) {
                        dfd.resolve(item);
                    } else {
                        // If the value of version is not found, we return 0.0.0 to ensure upgrade migrations run
                        dfd.resolve(VERSION_000);
                    }
                });
            } else {
                localForage.setItem(VERSION, value, function (err, item) {
                    if (err) {
                        dfd.reject(err);
                    } else {
                        dfd.resolve(item);
                    }
                });
            }
            return dfd.promise();
        };

        /**
         * Create a collection
         * @see https://docs.mongodb.com/manual/reference/method/db.createCollection/
         * @param name
         * @param options
         */
        Database.prototype.createCollection = function (name, options) {
            // Note: we could keep track of collections in the META table
            throw new Error('Instantiate a new Database object and pass an array of collection names to the constructor.');
        };

        /**
         * Add full text index
         * @param collection
         * @param textFields
         */
        Database.prototype.addFullTextIndex = function (collection, textFields) {
            assert.type(STRING, collection, assert.format(assert.messages.type.default, 'collection', STRING));
            assert.instanceof(Collection, this[collection], assert.format(assert.messages.instanceof.default, 'this[collection]', 'Collection'));
            assert.isArray(textFields, assert.format(assert.messages.isArray.default, 'textFields'));
            this[collection]._textFields = textFields;
        };

        /**
         * Trigger
         * @param collection
         * @param events, a string or an array of strings
         * @param callback
         */
        Database.prototype.createTrigger = function (collection, events, callback) {
            if ($.type(events) === STRING) {
                events = [events];
            }
            assert.type(STRING, collection, assert.format(assert.messages.type.default, 'collection', STRING));
            assert.instanceof(Collection, this[collection], assert.format(assert.messages.instanceof.default, 'this[collection]', 'Collection'));
            assert.isArray(events, assert.format(assert.messages.isArray.default, 'events'));
            assert.isFunction(callback, assert.format(assert.messages.isFunction.default, 'callback'));
            for (var i = 0, length = events.length; i < length; i++) {
                var event = events[i].toLowerCase();
                if ([TRIGGER.INSERT, TRIGGER.UPDATE, TRIGGER.REMOVE].indexOf(event) > -1) {
                    this[collection]._triggers[event].push(callback);
                }
            }
        };

        /**
         * Drop a database
         * @see https://docs.mongodb.com/manual/reference/method/db.dropDatabase/
         */
        Database.prototype.dropDatabase = function () {
            // See https://github.com/localForage/localForage/issues/620
            throw new Error(NOT_IMPLEMENTED);
            var dfd = $.Deferred();
            localForage.dropInstance(this._name, function (err) {
                if (err) {
                    dfd.reject(err);
                } else {
                    dfd.resolve();
                }
            });
            return dfd.promise();
        };

    }(window.jQuery));

    /* jshint +W071 */

    return pongodb;

}, typeof define === 'function' && define.amd ? define : function (_, f) { 'use strict'; f(); });
