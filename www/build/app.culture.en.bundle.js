/*! <%= pkg.copyright %> - Version <%= pkg.version %> dated <%= grunt.template.today() %> */
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{260:function(e,t,o){var a,i,r;!function(s,n){"use strict";i=[o(361),o(360),o(359),o(358)],void 0===(r="function"==typeof(a=function(){return e=window.app=window.app||{},e.cultures=e.cultures||{},e.cultures.en={versions:{draft:{name:"Draft"},published:{name:"Version {0}"}},layout:{back:"Back"},activities:{viewTitle:"History",buttonGroup:{chart:"Chart",list:"List"},listView:{groups:{today:"Today",yesterday:"Yesterday",startOfWeek:"This Week",startOfMonth:"This Month"}}},categories:{viewTitle:"Explore"},correction:{viewTitle:"Page {0} of {1}",explanations:"Explanations"},dialogs:{buttons:{cancel:{text:"Cancel",icon:"close"},ok:{text:"OK",icon:"ok"}},confirm:"Confirm",error:"Error",info:"Information",success:"Success",warning:"Warning"},appStoreReview:{title:"Would you mind rating {0}?",message:"If you enjoy {0}, it won’t take more than a minute to encourage our development effort. Thanks for your help!",buttons:{cancel:{text:"Remind Me Later"},ok:{text:"Rate It Now"}}},drawer:{activities:"History",categories:"Explore",favourites:"Favourites",scan:"QR Code",settings:"Settings"},favourites:{viewTitle:"Favourites"},finder:{viewTitle:"Search"},network:{viewTitle:"Connection",title:"No Network"},notifications:{activitiesQueryFailure:"There was an error loading activities.",appVersionFailure:"You are running an old version which might raise compatibility issues. Please upgrade.",batteryCritical:"Battery level is critical. Recharge now!",batteryLow:"Battery level is low. Recharge soon!",clickSubmitInfo:'Press <i class="kf kf-submit"></i> to calculate your score.',confirmSubmit:"Do you really want to submit to calculate your score?",dbMigrationFailure:"The mobile database migration failed during the upgrade.",networkOffline:"You are disconnected from the Internet",networkOnline:"Your Internet connection is back.",oAuthTokenFailure:"The authentication service has returned an error.",openUrlUnknown:"There was an error opening an unknown url.",openUrlLanguage:"Please switch language to open this url.",pageNavigationInfo:'Press <i class="kf kf-previous"></i> and <i class="kf kf-next"></i> to navigate pages.',pinSaveFailure:"The 4 digit pins do not match.",pinSaveInfo:"Please enter and confirm your 4-digit pin before saving.",pinValidationFailure:"Wrong pin.",pinValidationInfo:"Please enter your pin to sign in.",scanFailure:"Scan failure. Check the app is authorized to use the camera.",scanLanguageWarning:"Change language settings to scan this QR code.",scanMatchWarning:"This QR code does not match.",scanPrompt:"Place a QR code inside the scan area.",scoreCalculationFailure:"There was an error calculating your score.",scoreSaveFailure:"There was an error saving your score.",scoreSaveSuccess:"Score saved successfully.",settingsLoadFailure:"There was an error loading settings.",sharingFailure:"There was an error sharing this quiz.",sharingSuccess:"This quiz has been successfully shared.",showScoreInfo:'Press <i class="kf kf-score"></i> to go back to your score.',signinUrlFailure:"There was an error obtaining a sign-in url for an authentication provider.",summariesQueryFailure:"There was an error querying our remote servers.",summaryLoadFailure:"There was an error loading summary data.",summaryViewInfo:"Press the button at the bottom of the page.",syncBandwidthLow:"You cannot synchronize with low bandwidth.",syncBatteryLow:"You cannot synchronize with low batteries.",syncFailure:"There has been an error syncing your data.",syncSuccess:"Mobile data successfully synchronized with remote servers.",syncUnauthorized:"You are unauthorised to synchronize. Please signin with an authentication provider.",unknownError:"There has been an unknown error. Please restart the app.",userLoadFailure:"There was an error loading your user profile.",userSaveFailure:"There was an error saving your user profile.",userSaveSuccess:"User profile successfully saved.",userSignInSuccess:"Signed in as {0}.",usersQueryFailure:"There was an error loading users.",versionLoadFailure:"There was an error loading version data.",versionsLoadFailure:"There was an error loading versions."},osNotifications:{title:"It’s been a while...",text:"What about running {0} to assess your progress?"},player:{viewTitle:"Page {0} of {1}",instructions:"Instructions"},score:{viewTitle:"Score {0:p0}",listView:{groups:"Page {0}",answer:"Answer",solution:"Solution"}},settings:{viewTitle:"Settings",category:"Curriculum",language:"Language",theme:"Theme",user:"User",version:"Version",switch:"Switch user",tour:"Take the tour",copyright:"Copyright &copy; 2013-2018 Memba&reg; Sarl"},signin:{viewTitle:"Walkthrough",viewTitle2:"Sign in",page0:"Browse and search assessments, practice tests and quizzes organized by subject categories.",page1:"Play questions, give answers and let the app compute your score.",page2:"Track and measure your progresses.",welcome:"Please select an authentication provider. We shall never use it to post on your behalf.",welcome2:'{0}, please select the {1} authentication provider to renew your credentials or press <i class="kf kf-user"></i>.'},summary:{viewTitle:"Details",author:"Author",category:"Category",description:"Description",metrics:"",published:"Published on",tags:"Tags",title:"Title",go:"Go",actionSheet:{cancel:"Cancel",feedback:"Feedback",play:"Play",share:"Share"},socialSharing:{chooserTitle:"Select an application",message:"Assess your knowledge with Kidoju.\n\n{0}\n{1}",subject:"Answer “{0}”?"}},sync:{viewTitle:"Synchronization",title:"Progress",message:{activities:"Syncing activities",complete:"Synchronization complete"},pass:{remote:"Remote",local:"Local"},buttons:{continue:"Continue"}},user:{viewTitle:"User",firstName:"First Name",lastName:"Last Name",lastUse:"Last Use",pin:"PIN",newPIN:"New PIN",confirm:"Confirm",save:"Save",signIn:"Sign In",newUser:"New User",changePIN:"Change PIN"},viewModel:{languages:[{value:"en",text:"English"},{value:"fr",text:"French"}],themes:[{value:"android-dark",text:"Android Dark"},{value:"android-light",text:"Android Light"},{value:"blackberry",text:"Blackberry"},{value:"fiori",text:"Fiori"},{value:"flat",text:"Flat"},{value:"ios",text:"iOS 6"},{value:"ios7",text:"iOS 7+"},{value:"material-dark",text:"Material Dark"},{value:"material-light",text:"Material Light"},{value:"meego",text:"Meego"},{value:"nova",text:"Nova"},{value:"office365",text:"Office 365"}]}},window.kendo.culture("en-GB"),window.app;var e})?a.apply(t,i):a)||(e.exports=r)}(0,o(0))},358:function(e,t,o){"use strict";var a,i=o(17),r=(a=i)&&a.__esModule?a:{default:a};var s=window.kendo,n=s.ui,l=n.AssetManager,d=n.BaseDialog,u=n.CodeEditor,c=n.Explorer,p=n.ImageList,g=n.MarkEditor,m=n.MediaPlayer,h=n.MultiInput,y=n.MultiQuiz,f=n.Navigation,v=n.PlayBar,k=n.PropertyGrid,w=n.Quiz,b=n.Social,x=n.Stage,T=n.StyleEditor,S=s.markeditor,C=s.mathinput;if(l){var M=l.prototype.options;M.messages=r.default.extend(!0,M.messages,{toolbar:{upload:"Upload",delete:"Delete",filter:"Collection: ",search:"Search"},tabs:{default:"Project"},data:{defaultName:"Uploading...",defaultImage:""}})}if(d){var A=d.prototype.options;A.messages=r.default.extend(!0,A.messages,{title:{error:"Error",info:"Information",success:"Success",warning:"Warning"},actions:{cancel:{action:"cancel",imageUrl:"https://cdn.kidoju.com/images/o_collection/svg/office/close.svg",text:"Cancel"},close:{action:"close",imageUrl:"https://cdn.kidoju.com/images/o_collection/svg/office/close.svg",primary:!0,text:"Close"},create:{action:"create",imageUrl:"https://cdn.kidoju.com/images/o_collection/svg/office/plus.svg",primary:!0,text:"Create"},no:{action:"no",imageUrl:"https://cdn.kidoju.com/images/o_collection/svg/office/close.svg",text:"No"},ok:{action:"ok",imageUrl:"https://cdn.kidoju.com/images/o_collection/svg/office/ok.svg",primary:!0,text:"OK"},yes:{action:"yes",imageUrl:"https://cdn.kidoju.com/images/o_collection/svg/office/ok.svg",primary:!0,text:"Yes"}}})}if(u){var F=u.prototype.options;F.messages=r.default.extend(!0,F.messages,{formula:"Formula:",notApplicable:"N/A",solution:"Solution:",value:"Value:",test:"Test",success:"Success",failure:"Failure",omit:"Omit",error:"Error",ajaxError:"Error loading worker library.",jsonError:"Error parsing value as json. Wrap strings in double quotes.",timeoutError:"The execution of a web worker has timed out."})}if(c){var I=c.prototype.options;I.messages=r.default.extend(!0,I.messages,{empty:"No item to display"})}if(p){var P=p.prototype.options;P.messages=r.default.extend(!0,P.messages,{toolbar:{add:"Add"},validation:{image:"An image url is required.",text:"Some text is required."}})}if(g){var q=g.prototype.options;q.messages=r.default.extend(!0,q.messages,{image:"An undescribed image",link:"Click here"})}if(S&&S.messages.dialogs&&(S.messages.dialogs=r.default.extend(!0,S.messages.dialogs,{cancel:'<img alt="icon" src="https://cdn.kidoju.com/images/o_collection/svg/office/close.svg" class="k-image">Cancel',okText:'<img alt="icon" src="https://cdn.kidoju.com/images/o_collection/svg/office/ok.svg" class="k-image">OK',headingsDialog:{title:"Start Cap",buttons:{h1:"Heading 1",h2:"Heading 2",h3:"Heading 3",h4:"Heading 4",h5:"Heading 5",h6:"Heading 6"}},linkDialog:{title:"Hyperlink",labels:{text:"Url"}},imageDialog:{title:"Image",labels:{url:"Url"}},latexDialog:{title:"Mathematic Expression",labels:{display:"Display",inline:"inline"}},previewDialog:{title:"Preview"}})),S&&S.messages.toolbar&&(S.messages.toolbar=r.default.extend(!0,S.messages.toolbar,{undo:"Undo",redo:"Redo",headings:"Headings",headingsButtons:{h1:"Heading 1",h2:"Heading 2",h3:"Heading 3",h4:"Heading 4",h5:"Heading 5",h6:"Heading 6"},bold:"Bold",italic:"Italic",bulleted:"Bulleted List",numbered:"Numbered List",blockquote:"Blockquote",hrule:"Horizontal Rule",link:"Hyperlink",image:"Image",code:"Code",latex:"Mathematic Expression",preview:"Preview in New Window"})),C&&C.messages.dialogs&&(C.messages.dialogs=r.default.extend(!0,C.messages.dialogs,{keypad:{title:"KeyPad",buttons:{comma:",",stop:".",n0:"0",n1:"1",n2:"2",n3:"3",n4:"4",n5:"5",n6:"6",n7:"7",n8:"8",n9:"9",a:"a",b:"b",c:"c",i:"i",j:"j",k:"k",n:"n",p:"p",q:"q",x:"x",y:"y",z:"z",pi:"Pi",infty:"Infinity",space:"Space",subscript:"Subscript"}},basic:{title:"Basic",buttons:{equal:"Equal",plus:"Plus",minus:"Minus",cdot:"Times",times:"Times",div:"Divide",pleft:"Left parenthesis (",pright:"Right parenthesis )",frac:"Fraction",sqrt:"Square root",pow2:"Power of 2",pow3:"Power of 3",sin:"Sine",cos:"Cosine",tan:"Tangent"}},greek:{title:"Greek",buttons:{alpha:"Alpha",beta:"Beta",gamma:"Gamma",delta:"Delta",epsilon:"Epsilon",zeta:"Zeta",eta:"Eta",theta:"Theta",iota:"Iota",kappa:"Kappa",lambda:"Lambda",mu:"Mu",nu:"Nu",xi:"Xi",omicron:"Omicron",pi:"Pi",rho:"Rho",sigma:"Sigma",tau:"Tau",upsilon:"Upsilon",phi:"Phi",chi:"Chi",psi:"Psi",omega:"Omega"}},operators:{title:"Operators",buttons:{equal:"Equal",plus:"Plus",minus:"Minus",cdot:"Times",times:"Times",div:"Divide",pleft:"Left parenthesis (",pright:"Right parenthesis )",bleft:"Left square bracket [",bright:"Right square bracket ]",cleft:"Left curly bracket {",cright:"Right curly bracket }",vleft:"Left vertical line |",vright:"Right vertical line |",lt:"Lower than",le:"Lower than or equal",gt:"Greater than",ge:"Greater than or equal",neq:"Not equal",approx:"Approximate",propto:"Proportional",plusminus:"Plus-Minus",percent:"Percent",not:"Not",and:"And",or:"Or",circ:"Composition",nabla:"Nabla"}},expressions:{title:"Functions",buttons:{sqrt:"Square root",cubert:"Cube root",nthroot:"Nth root",pow2:"Power of 2",pow3:"Power of 3",pow:"Power",log:"Logarithm",log10:"Logarithm base 10",ln:"Naperian logarithm",sin:"Sine",cos:"Cosine",tan:"Tangent",arcsin:"Arc sine",arccos:"Arc cosine",arctan:"Arc tangent",deriv:"Derivative",partial:"Partial derivative",int:"Integral",oint:"Contour integral",sum:"Sum",prod:"Product",lim:"Limit"}},sets:{title:"Sets",buttons:{cset:"Complexes",pset:"Primes",nset:"Naturals",qset:"Rationals",rset:"Reals",zset:"Integers",emptyset:"Empty set",forall:"For all",exists:"Exists",nexists:"Not exists",in:"In",nin:"Not in",subset:"Subset",supset:"Superset",nsubset:"Not subset",nsupset:"Not superset",intersection:"Intersection",union:"Union",to:"To",implies:"Implies",impliedby:"Implied by",nimplies:"Not implies",iff:"Equivalent to"}},matrices:{title:"Matrices",buttons:{vector:"Vector",widehat:"Widehat (angle)",matrix:"Matrix",pmatrix:"Matrix with parentheses",bmatrix:"Matrix with square brackets",bbmatrix:"Matrix with curly braces",vmatrix:"Matrix with vertical lines",vvmatrix:"Matrix with double vertical lines",column:"Add column",row:"Add row"}},statistics:{title:"Statistics",buttons:{factorial:"Factorial",binomial:"Binomial",overline:"Overline (mean)"}}})),C&&C.messages.toolbar&&(C.messages.toolbar=r.default.extend(!0,C.messages.toolbar,{field:{title:"Field"},backspace:{title:"Backspace"},keypad:{title:"KeyPad",buttons:{comma:",",stop:".",n0:"0",n1:"1",n2:"2",n3:"3",n4:"4",n5:"5",n6:"6",n7:"7",n8:"8",n9:"9",a:"a",b:"b",c:"c",i:"i",j:"j",k:"k",n:"n",p:"p",q:"q",x:"x",y:"y",z:"z",pi:"Pi",infty:"Infinity",space:"Space",subscript:"Subscript"}},basic:{title:"Basic",buttons:{equal:"Equal",plus:"Plus",minus:"Minus",cdot:"Times",times:"Times",div:"Divide",pleft:"Left parenthesis (",pright:"Right parenthesis )",frac:"Fraction",sqrt:"Square root",pow2:"Power of 2",pow3:"Power of 3",sin:"Sine",cos:"Cosine",tan:"Tangent"}},greek:{title:"Greek",buttons:{alpha:"Alpha",beta:"Beta",gamma:"Gamma",delta:"Delta",epsilon:"Epsilon",zeta:"Zeta",eta:"Eta",theta:"Theta",iota:"Iota",kappa:"Kappa",lambda:"Lambda",mu:"Mu",nu:"Nu",xi:"Xi",omicron:"Omicron",pi:"Pi",rho:"Rho",sigma:"Sigma",tau:"Tau",upsilon:"Upsilon",phi:"Phi",chi:"Chi",psi:"Psi",omega:"Omega"}},operators:{title:"Operators",buttons:{equal:"Equal",plus:"Plus",minus:"Minus",cdot:"Times",times:"Times",div:"Divide",pleft:"Left parenthesis (",pright:"Right parenthesis )",bleft:"Left square bracket [",bright:"Right square bracket ]",cleft:"Left curly bracket {",cright:"Right curly bracket }",vleft:"Left vertical line |",vright:"Right vertical line |",lt:"Lower than",le:"Lower than or equal",gt:"Greater than",ge:"Greater than or equal",neq:"Not equal",approx:"Approximate",propto:"Proportional",plusminus:"Plus-Minus",percent:"Percent",not:"Not",and:"And",or:"Or",circ:"Composition",nabla:"Nabla"}},expressions:{title:"Functions",buttons:{sqrt:"Square root",cubert:"Cube root",nthroot:"Nth root",pow2:"Power of 2",pow3:"Power of 3",pow:"Power",log:"Logarithm",log10:"Logarithm base 10",ln:"Naperian logarithm",sin:"Sine",cos:"Cosine",tan:"Tangent",arcsin:"Arc sine",arccos:"Arc cosine",arctan:"Arc tangent",deriv:"Derivative",partial:"Partial derivative",int:"Integral",oint:"Contour integral",sum:"Sum",prod:"Product",lim:"Limit"}},sets:{title:"Sets",buttons:{cset:"Complexes",pset:"Primes",nset:"Naturals",qset:"Rationals",rset:"Reals",zset:"Integers",emptyset:"Empty set",forall:"For all",exists:"Exists",nexists:"Not exists",in:"In",nin:"Not in",subset:"Subset",supset:"Superset",nsubset:"Not subset",nsupset:"Not superset",intersection:"Intersection",union:"Union",to:"To",implies:"Implies",impliedby:"Implied by",nimplies:"Not implies",iff:"Equivalent to"}},matrices:{title:"Matrices",buttons:{vector:"Vector",widehat:"Widehat (angle)",matrix:"Matrix",pmatrix:"Matrix with parentheses",bmatrix:"Matrix with square brackets",bbmatrix:"Matrix with curly braces",vmatrix:"Matrix with vertical lines",vvmatrix:"Matrix with double vertical lines",column:"Add column",row:"Add row"}},statistics:{title:"Statistics",buttons:{factorial:"Factorial",binomial:"Binomial",overline:"Overline (mean)"}}})),m){var D=m.prototype.options;D.messages=r.default.extend(!0,D.messages,{play:"Play/Pause",mute:"Mute/Unmute",full:"Full Screen",notSupported:"Media not supported"})}if(h){var R=h.prototype.options;R.messages=r.default.extend(!0,R.messages,{delete:"Delete"})}if(y){var z=y.prototype.options;z.messages=r.default.extend(!0,z.messages,{placeholder:"Select..."})}if(f){var B=f.prototype.options;B.messages=r.default.extend(!0,B.messages,{empty:"No item to display"})}if(v){var E=v.prototype.options;E.messages=r.default.extend(!0,E.messages,{empty:"No page to display",page:"Page",of:"of {0}",first:"Go to the first page",previous:"Go to the previous page",next:"Go to the next page",last:"Go to the last page",refresh:"Refresh",morePages:"More pages"})}if(k){var N=k.prototype.options;N.messages=r.default.extend(!0,N.messages,{property:"Property",value:"Value"})}if(w){var L=w.prototype.options;L.messages=r.default.extend(!0,L.messages,{optionLabel:"Select..."})}if(b){var H=b.prototype.options;H.messages=r.default.extend(!0,H.messages,{classroom:"Share to Google Classroom",facebook:"Share to Facebook",google:"Share to Google+",linkedin:"Share to LinkedIn",pinterest:"Share to Pinterest",twitter:"Share to Twitter"})}if(x){var U=x.prototype.options;U.messages=r.default.extend(!0,U.messages,{contextMenu:{delete:"Delete",duplicate:"Duplicate"},noPage:"Please add or select a page"})}if(T){var O=T.prototype.options;O.messages=r.default.extend(!0,O.messages,{columns:{name:"Name",value:"Value"},toolbar:{create:"New Style",destroy:"Delete"},validation:{name:"Name is required",value:"Value is required"}})}},359:function(e,t,o){"use strict";var a,i=o(17),r=(a=i)&&a.__esModule?a:{default:a};var s=window.kendo.mobile.ui;s.ListView&&(s.ListView.prototype.options.filterable=r.default.extend(!0,s.ListView.prototype.options.filterable,{placeholder:"Search..."}),s.ListView.prototype.options.messages=r.default.extend(!0,s.ListView.prototype.options.messages,{loadMoreText:"Press to load more"}))},360:function(e,t,o){var a,i,r;i=[o(1)],void 0===(r="function"==typeof(a=function(){var e;e=window.kendo.jQuery,kendo.ui.FlatColorPicker&&(kendo.ui.FlatColorPicker.prototype.options.messages=e.extend(!0,kendo.ui.FlatColorPicker.prototype.options.messages,{apply:"Apply",cancel:"Cancel",noColor:"no colour",clearColor:"Clear colour"})),kendo.ui.ColorPicker&&(kendo.ui.ColorPicker.prototype.options.messages=e.extend(!0,kendo.ui.ColorPicker.prototype.options.messages,{apply:"Apply",cancel:"Cancel",noColor:"no colour",clearColor:"Clear colour"})),kendo.ui.ColumnMenu&&(kendo.ui.ColumnMenu.prototype.options.messages=e.extend(!0,kendo.ui.ColumnMenu.prototype.options.messages,{sortAscending:"Sort Ascending",sortDescending:"Sort Descending",filter:"Filter",columns:"Columns",done:"Done",settings:"Column Settings",lock:"Lock",unlock:"Unlock"})),kendo.ui.Editor&&(kendo.ui.Editor.prototype.options.messages=e.extend(!0,kendo.ui.Editor.prototype.options.messages,{bold:"Bold",italic:"Italic",underline:"Underline",strikethrough:"Strikethrough",superscript:"Superscript",subscript:"Subscript",justifyCenter:"Center text",justifyLeft:"Align text left",justifyRight:"Align text right",justifyFull:"Justify",insertUnorderedList:"Insert unordered list",insertOrderedList:"Insert ordered list",indent:"Indent",outdent:"Outdent",createLink:"Insert hyperlink",unlink:"Remove hyperlink",insertImage:"Insert image",insertFile:"Insert file",insertHtml:"Insert HTML",viewHtml:"View HTML",fontName:"Select font family",fontNameInherit:"(inherited font)",fontSize:"Select font size",fontSizeInherit:"(inherited size)",formatBlock:"Format",formatting:"Format",foreColor:"Colour",backColor:"Background colour",style:"Styles",emptyFolder:"Empty Folder",uploadFile:"Upload",overflowAnchor:"More tools",orderBy:"Arrange by:",orderBySize:"Size",orderByName:"Name",invalidFileType:'The selected file "{0}" is not valid. Supported file types are {1}.',deleteFile:'Are you sure you want to delete "{0}"?',overwriteFile:'A file with name "{0}" already exists in the current directory. Do you want to overwrite it?',directoryNotFound:"A directory with this name was not found.",imageWebAddress:"Web address",imageAltText:"Alternate text",imageWidth:"Width (px)",imageHeight:"Height (px)",fileWebAddress:"Web address",fileTitle:"Title",linkWebAddress:"Web address",linkText:"Text",linkToolTip:"ToolTip",linkOpenInNewWindow:"Open link in new window",dialogUpdate:"Update",dialogInsert:"Insert",dialogButtonSeparator:"or",dialogCancel:"Cancel",cleanFormatting:"Clean formatting",createTable:"Create table",addColumnLeft:"Add column on the left",addColumnRight:"Add column on the right",addRowAbove:"Add row above",addRowBelow:"Add row below",deleteRow:"Delete row",deleteColumn:"Delete column",dialogOk:"Ok",tableWizard:"Table Wizard",tableTab:"Table",cellTab:"Cell",accessibilityTab:"Accessibility",caption:"Caption",summary:"Summary",width:"Width",height:"Height",units:"Units",cellSpacing:"Cell Spacing",cellPadding:"Cell Padding",cellMargin:"Cell Margin",alignment:"Alignment",background:"Background",cssClass:"CSS Class",id:"ID",border:"Border",borderStyle:"Border Style",collapseBorders:"Collapse borders",wrapText:"Wrap text",associateCellsWithHeaders:"Associate cells with headers",alignLeft:"Align Left",alignCenter:"Align Center",alignRight:"Align Right",alignLeftTop:"Align Left Top",alignCenterTop:"Align Center Top",alignRightTop:"Align Right Top",alignLeftMiddle:"Align Left Middle",alignCenterMiddle:"Align Center Middle",alignRightMiddle:"Align Right Middle",alignLeftBottom:"Align Left Bottom",alignCenterBottom:"Align Center Bottom",alignRightBottom:"Align Right Bottom",alignRemove:"Remove Alignment",columns:"Columns",rows:"Rows",selectAllCells:"Select All Cells"})),kendo.ui.FileBrowser&&(kendo.ui.FileBrowser.prototype.options.messages=e.extend(!0,kendo.ui.FileBrowser.prototype.options.messages,{uploadFile:"Upload",orderBy:"Arrange by",orderByName:"Name",orderBySize:"Size",directoryNotFound:"A directory with this name was not found.",emptyFolder:"Empty Folder",deleteFile:'Are you sure you want to delete "{0}"?',invalidFileType:'The selected file "{0}" is not valid. Supported file types are {1}.',overwriteFile:'A file with name "{0}" already exists in the current directory. Do you want to overwrite it?',dropFilesHere:"drop file here to upload",search:"Search"})),kendo.ui.FilterCell&&(kendo.ui.FilterCell.prototype.options.messages=e.extend(!0,kendo.ui.FilterCell.prototype.options.messages,{isTrue:"is true",isFalse:"is false",filter:"Filter",clear:"Clear",operator:"Operator"})),kendo.ui.FilterCell&&(kendo.ui.FilterCell.prototype.options.operators=e.extend(!0,kendo.ui.FilterCell.prototype.options.operators,{string:{eq:"Is equal to",neq:"Is not equal to",startswith:"Starts with",contains:"Contains",doesnotcontain:"Does not contain",endswith:"Ends with",isnull:"Is null",isnotnull:"Is not null",isempty:"Is empty",isnotempty:"Is not empty",isnullorempty:"Has no value",isnotnullorempty:"Has value"},number:{eq:"Is equal to",neq:"Is not equal to",gte:"Is greater than or equal to",gt:"Is greater than",lte:"Is less than or equal to",lt:"Is less than",isnull:"Is null",isnotnull:"Is not null"},date:{eq:"Is equal to",neq:"Is not equal to",gte:"Is after or equal to",gt:"Is after",lte:"Is before or equal to",lt:"Is before",isnull:"Is null",isnotnull:"Is not null"},enums:{eq:"Is equal to",neq:"Is not equal to",isnull:"Is null",isnotnull:"Is not null"}})),kendo.ui.FilterMenu&&(kendo.ui.FilterMenu.prototype.options.messages=e.extend(!0,kendo.ui.FilterMenu.prototype.options.messages,{info:"Show items with value that:",isTrue:"is true",isFalse:"is false",filter:"Filter",clear:"Clear",and:"And",or:"Or",selectValue:"-Select value-",operator:"Operator",value:"Value",cancel:"Cancel"})),kendo.ui.FilterMenu&&(kendo.ui.FilterMenu.prototype.options.operators=e.extend(!0,kendo.ui.FilterMenu.prototype.options.operators,{string:{eq:"Is equal to",neq:"Is not equal to",startswith:"Starts with",contains:"Contains",doesnotcontain:"Does not contain",endswith:"Ends with",isnull:"Is null",isnotnull:"Is not null",isempty:"Is empty",isnotempty:"Is not empty",isnullorempty:"Has no value",isnotnullorempty:"Has value"},number:{eq:"Is equal to",neq:"Is not equal to",gte:"Is greater than or equal to",gt:"Is greater than",lte:"Is less than or equal to",lt:"Is less than",isnull:"Is null",isnotnull:"Is not null"},date:{eq:"Is equal to",neq:"Is not equal to",gte:"Is after or equal to",gt:"Is after",lte:"Is before or equal to",lt:"Is before",isnull:"Is null",isnotnull:"Is not null"},enums:{eq:"Is equal to",neq:"Is not equal to",isnull:"Is null",isnotnull:"Is not null"}})),kendo.ui.FilterMultiCheck&&(kendo.ui.FilterMultiCheck.prototype.options.messages=e.extend(!0,kendo.ui.FilterMultiCheck.prototype.options.messages,{checkAll:"Select All",clear:"Clear",filter:"Filter",search:"Search"})),kendo.ui.Gantt&&(kendo.ui.Gantt.prototype.options.messages=e.extend(!0,kendo.ui.Gantt.prototype.options.messages,{actions:{addChild:"Add Child",append:"Add Task",insertAfter:"Add Below",insertBefore:"Add Above",pdf:"Export to PDF"},cancel:"Cancel",deleteDependencyWindowTitle:"Delete dependency",deleteTaskWindowTitle:"Delete task",destroy:"Delete",editor:{assingButton:"Assign",editorTitle:"Task",end:"End",percentComplete:"Complete",resources:"Resources",resourcesEditorTitle:"Resources",resourcesHeader:"Resources",start:"Start",title:"Title",unitsHeader:"Units"},save:"Save",views:{day:"Day",end:"End",month:"Month",start:"Start",week:"Week",year:"Year"}})),kendo.ui.Grid&&(kendo.ui.Grid.prototype.options.messages=e.extend(!0,kendo.ui.Grid.prototype.options.messages,{commands:{cancel:"Cancel changes",canceledit:"Cancel",create:"Add new record",destroy:"Delete",edit:"Edit",excel:"Export to Excel",pdf:"Export to PDF",save:"Save changes",select:"Select",update:"Update"},editable:{cancelDelete:"Cancel",confirmation:"Are you sure you want to delete this record?",confirmDelete:"Delete"},noRecords:"No records available."})),kendo.ui.Groupable&&(kendo.ui.Groupable.prototype.options.messages=e.extend(!0,kendo.ui.Groupable.prototype.options.messages,{empty:"Drag a column header and drop it here to group by that column"})),kendo.ui.NumericTextBox&&(kendo.ui.NumericTextBox.prototype.options=e.extend(!0,kendo.ui.NumericTextBox.prototype.options,{upArrowText:"Increase value",downArrowText:"Decrease value"})),kendo.ui.MediaPlayer&&(kendo.ui.MediaPlayer.prototype.options.messages=e.extend(!0,kendo.ui.MediaPlayer.prototype.options.messages,{pause:"Pause",play:"Play",mute:"Mute",unmute:"Unmute",quality:"Quality",fullscreen:"Full Screen"})),kendo.ui.Pager&&(kendo.ui.Pager.prototype.options.messages=e.extend(!0,kendo.ui.Pager.prototype.options.messages,{allPages:"All",display:"{0} - {1} of {2} items",empty:"No items to display",page:"Page",of:"of {0}",itemsPerPage:"items per page",first:"Go to the first page",previous:"Go to the previous page",next:"Go to the next page",last:"Go to the last page",refresh:"Refresh",morePages:"More pages"})),kendo.ui.PivotGrid&&(kendo.ui.PivotGrid.prototype.options.messages=e.extend(!0,kendo.ui.PivotGrid.prototype.options.messages,{measureFields:"Drop Data Fields Here",columnFields:"Drop Column Fields Here",rowFields:"Drop Rows Fields Here"})),kendo.ui.PivotFieldMenu&&(kendo.ui.PivotFieldMenu.prototype.options.messages=e.extend(!0,kendo.ui.PivotFieldMenu.prototype.options.messages,{info:"Show items with value that:",filterFields:"Fields Filter",filter:"Filter",include:"Include Fields...",title:"Fields to include",clear:"Clear",ok:"Ok",cancel:"Cancel",operators:{contains:"Contains",doesnotcontain:"Does not contain",startswith:"Starts with",endswith:"Ends with",eq:"Is equal to",neq:"Is not equal to"}})),kendo.ui.RecurrenceEditor&&(kendo.ui.RecurrenceEditor.prototype.options.messages=e.extend(!0,kendo.ui.RecurrenceEditor.prototype.options.messages,{frequencies:{never:"Never",hourly:"Hourly",daily:"Daily",weekly:"Weekly",monthly:"Monthly",yearly:"Yearly"},hourly:{repeatEvery:"Repeat every: ",interval:" hour(s)"},daily:{repeatEvery:"Repeat every: ",interval:" day(s)"},weekly:{interval:" week(s)",repeatEvery:"Repeat every: ",repeatOn:"Repeat on: "},monthly:{repeatEvery:"Repeat every: ",repeatOn:"Repeat on: ",interval:" month(s)",day:"Day "},yearly:{repeatEvery:"Repeat every: ",repeatOn:"Repeat on: ",interval:" year(s)",of:" of "},end:{label:"End:",mobileLabel:"Ends",never:"Never",after:"After ",occurrence:" occurrence(s)",on:"On "},offsetPositions:{first:"first",second:"second",third:"third",fourth:"fourth",last:"last"},weekdays:{day:"day",weekday:"weekday",weekend:"weekend day"}})),kendo.ui.Scheduler&&(kendo.ui.Scheduler.prototype.options.messages=e.extend(!0,kendo.ui.Scheduler.prototype.options.messages,{allDay:"all day",date:"Date",event:"Event",time:"Time",showFullDay:"Show full day",showWorkDay:"Show business hours",today:"Today",save:"Save",cancel:"Cancel",destroy:"Delete",deleteWindowTitle:"Delete event",ariaSlotLabel:"Selected from {0:t} to {1:t}",ariaEventLabel:"{0} on {1:D} at {2:t}",editable:{confirmation:"Are you sure you want to delete this event?"},views:{day:"Day",week:"Week",workWeek:"Work Week",agenda:"Agenda",month:"Month",timeline:"Timeline"},recurrenceMessages:{deleteWindowTitle:"Delete Recurring Item",deleteWindowOccurrence:"Delete current occurrence",deleteWindowSeries:"Delete the series",editWindowTitle:"Edit Recurring Item",editWindowOccurrence:"Edit current occurrence",editWindowSeries:"Edit the series",deleteRecurring:"Do you want to delete only this event occurrence or the whole series?",editRecurring:"Do you want to edit only this event occurrence or the whole series?"},editor:{title:"Title",start:"Start",end:"End",allDayEvent:"All day event",description:"Description",repeat:"Repeat",timezone:" ",startTimezone:"Start timezone",endTimezone:"End timezone",separateTimezones:"Use separate start and end time zones",timezoneEditorTitle:"Timezones",timezoneEditorButton:"Time zone",timezoneTitle:"Time zones",noTimezone:"No timezone",editorTitle:"Event"}})),kendo.spreadsheet&&kendo.spreadsheet.messages.borderPalette&&(kendo.spreadsheet.messages.borderPalette=e.extend(!0,kendo.spreadsheet.messages.borderPalette,{allBorders:"All borders",insideBorders:"Inside borders",insideHorizontalBorders:"Inside horizontal borders",insideVerticalBorders:"Inside vertical borders",outsideBorders:"Outside borders",leftBorder:"Left border",topBorder:"Top border",rightBorder:"Right border",bottomBorder:"Bottom border",noBorders:"No border",reset:"Reset colour",customColor:"Custom colour...",apply:"Apply",cancel:"Cancel"})),kendo.spreadsheet&&kendo.spreadsheet.messages.dialogs&&(kendo.spreadsheet.messages.dialogs=e.extend(!0,kendo.spreadsheet.messages.dialogs,{apply:"Apply",save:"Save",cancel:"Cancel",remove:"Remove",retry:"Retry",revert:"Revert",okText:"OK",formatCellsDialog:{title:"Format",categories:{number:"Number",currency:"Currency",date:"Date"}},fontFamilyDialog:{title:"Font"},fontSizeDialog:{title:"Font size"},bordersDialog:{title:"Borders"},alignmentDialog:{title:"Alignment",buttons:{justtifyLeft:"Align left",justifyCenter:"Center",justifyRight:"Align right",justifyFull:"Justify",alignTop:"Align top",alignMiddle:"Align middle",alignBottom:"Align bottom"}},mergeDialog:{title:"Merge cells",buttons:{mergeCells:"Merge all",mergeHorizontally:"Merge horizontally",mergeVertically:"Merge vertically",unmerge:"Unmerge"}},freezeDialog:{title:"Freeze panes",buttons:{freezePanes:"Freeze panes",freezeRows:"Freeze rows",freezeColumns:"Freeze columns",unfreeze:"Unfreeze panes"}},validationDialog:{title:"Data Validation",hintMessage:"Please enter a valid {0} value {1}.",hintTitle:"Validation {0}",criteria:{any:"Any value",number:"Number",text:"Text",date:"Date",custom:"Custom Formula",list:"List"},comparers:{greaterThan:"greater than",lessThan:"less than",between:"between",notBetween:"not between",equalTo:"equal to",notEqualTo:"not equal to",greaterThanOrEqualTo:"greater than or equal to",lessThanOrEqualTo:"less than or equal to"},comparerMessages:{greaterThan:"greater than {0}",lessThan:"less than {0}",between:"between {0} and {1}",notBetween:"not between {0} and {1}",equalTo:"equal to {0}",notEqualTo:"not equal to {0}",greaterThanOrEqualTo:"greater than or equal to {0}",lessThanOrEqualTo:"less than or equal to {0}",custom:"that satisfies the formula: {0}"},labels:{criteria:"Criteria",comparer:"Comparer",min:"Min",max:"Max",value:"Value",start:"Start",end:"End",onInvalidData:"On invalid data",rejectInput:"Reject input",showWarning:"Show warning",showHint:"Show hint",hintTitle:"Hint title",hintMessage:"Hint message",ignoreBlank:"Ignore blank"},placeholders:{typeTitle:"Type title",typeMessage:"Type message"}},exportAsDialog:{title:"Export...",labels:{fileName:"File name",saveAsType:"Save as type",exportArea:"Export",paperSize:"Paper size",margins:"Margins",orientation:"Orientation",print:"Print",guidelines:"Guidelines",center:"Center",horizontally:"Horizontally",vertically:"Vertically"}},modifyMergedDialog:{errorMessage:"Cannot change part of a merged cell."},useKeyboardDialog:{title:"Copying and pasting",errorMessage:"These actions cannot be invoked through the menu. Please use the keyboard shortcuts instead:",labels:{forCopy:"for copy",forCut:"for cut",forPaste:"for paste"}},unsupportedSelectionDialog:{errorMessage:"That action cannot be performed on multiple selection."}})),kendo.spreadsheet&&kendo.spreadsheet.messages.filterMenu&&(kendo.spreadsheet.messages.filterMenu=e.extend(!0,kendo.spreadsheet.messages.filterMenu,{sortAscending:"Sort range A to Z",sortDescending:"Sort range Z to A",filterByValue:"Filter by value",filterByCondition:"Filter by condition",apply:"Apply",search:"Search",addToCurrent:"Add to current selection",clear:"Clear",blanks:"(Blanks)",operatorNone:"None",and:"AND",or:"OR",operators:{string:{contains:"Text contains",doesnotcontain:"Text does not contain",startswith:"Text starts with",endswith:"Text ends with"},date:{eq:"Date is",neq:"Date is not",lt:"Date is before",gt:"Date is after"},number:{eq:"Is equal to",neq:"Is not equal to",gte:"Is greater than or equal to",gt:"Is greater than",lte:"Is less than or equal to",lt:"Is less than"}}})),kendo.spreadsheet&&kendo.spreadsheet.messages.colorPicker&&(kendo.spreadsheet.messages.colorPicker=e.extend(!0,kendo.spreadsheet.messages.colorPicker,{reset:"Reset color",customColor:"Custom color...",apply:"Apply",cancel:"Cancel"})),kendo.spreadsheet&&kendo.spreadsheet.messages.toolbar&&(kendo.spreadsheet.messages.toolbar=e.extend(!0,kendo.spreadsheet.messages.toolbar,{addColumnLeft:"Add column left",addColumnRight:"Add column right",addRowAbove:"Add row above",addRowBelow:"Add row below",alignment:"Alignment",alignmentButtons:{justtifyLeft:"Align left",justifyCenter:"Center",justifyRight:"Align right",justifyFull:"Justify",alignTop:"Align top",alignMiddle:"Align middle",alignBottom:"Align bottom"},backgroundColor:"Background",bold:"Bold",borders:"Borders",colorPicker:{reset:"Reset colour",customColor:"Custom colour..."},copy:"Copy",cut:"Cut",deleteColumn:"Delete column",deleteRow:"Delete row",excelImport:"Import from Excel...",filter:"Filter",fontFamily:"Font",fontSize:"Font size",format:"Custom format...",formatTypes:{automatic:"Automatic",number:"Number",percent:"Percent",financial:"Financial",currency:"Currency",date:"Date",time:"Time",dateTime:"Date time",duration:"Duration",moreFormats:"More formats..."},formatDecreaseDecimal:"Decrease decimal",formatIncreaseDecimal:"Increase decimal",freeze:"Freeze panes",freezeButtons:{freezePanes:"Freeze panes",freezeRows:"Freeze rows",freezeColumns:"Freeze columns",unfreeze:"Unfreeze panes"},italic:"Italic",merge:"Merge cells",mergeButtons:{mergeCells:"Merge all",mergeHorizontally:"Merge horizontally",mergeVertically:"Merge vertically",unmerge:"Unmerge"},open:"Open...",paste:"Paste",quickAccess:{redo:"Redo",undo:"Undo"},saveAs:"Save As...",sort:"Sort",sortAsc:"Sort ascending",sortDesc:"Sort descending",sortButtons:{sortSheetAsc:"Sort sheet A to Z",sortSheetDesc:"Sort sheet Z to A",sortRangeAsc:"Sort range A to Z",sortRangeDesc:"Sort range Z to A"},textColor:"Text Colour",textWrap:"Wrap text",underline:"Underline",validation:"Data validation..."})),kendo.spreadsheet&&kendo.spreadsheet.messages.view&&(kendo.spreadsheet.messages.view=e.extend(!0,kendo.spreadsheet.messages.view,{nameBox:"Name Box",errors:{shiftingNonblankCells:"Cannot insert cells due to data loss possibility. Select another insert location or delete the data from the end of your worksheet.",filterRangeContainingMerges:"Cannot create a filter within a range containing merges",validationError:"The value that you entered violates the validation rules set on the cell."},tabs:{home:"Home",insert:"Insert",data:"Data"}})),kendo.ui.Slider&&(kendo.ui.Slider.prototype.options=e.extend(!0,kendo.ui.Slider.prototype.options,{increaseButtonTitle:"Increase",decreaseButtonTitle:"Decrease"})),kendo.ui.TreeList&&(kendo.ui.TreeList.prototype.options.messages=e.extend(!0,kendo.ui.TreeList.prototype.options.messages,{noRows:"No records to display",loading:"Loading...",requestFailed:"Request failed.",retry:"Retry",commands:{edit:"Edit",update:"Update",canceledit:"Cancel",create:"Add new record",createchild:"Add child record",destroy:"Delete",excel:"Export to Excel",pdf:"Export to PDF"}})),kendo.ui.TreeView&&(kendo.ui.TreeView.prototype.options.messages=e.extend(!0,kendo.ui.TreeView.prototype.options.messages,{loading:"Loading...",requestFailed:"Request failed.",retry:"Retry"})),kendo.ui.Upload&&(kendo.ui.Upload.prototype.options.localization=e.extend(!0,kendo.ui.Upload.prototype.options.localization,{select:"Select files...",cancel:"Cancel",retry:"Retry",remove:"Remove",uploadSelectedFiles:"Upload files",dropFilesHere:"drop files here to upload",statusUploading:"uploading",statusUploaded:"uploaded",statusWarning:"warning",statusFailed:"failed",headerStatusUploading:"Uploading...",headerStatusUploaded:"Done"})),kendo.ui.Validator&&(kendo.ui.Validator.prototype.options.messages=e.extend(!0,kendo.ui.Validator.prototype.options.messages,{required:"{0} is required",pattern:"{0} is not valid",min:"{0} should be greater than or equal to {1}",max:"{0} should be smaller than or equal to {1}",step:"{0} is not valid",email:"{0} is not valid email",url:"{0} is not valid URL",date:"{0} is not valid date",dateCompare:"End date should be greater than or equal to the start date"})),kendo.ui.Dialog&&(kendo.ui.Dialog.prototype.options.messages=e.extend(!0,kendo.ui.Dialog.prototype.options.localization,{close:"Close"})),kendo.ui.Alert&&(kendo.ui.Alert.prototype.options.messages=e.extend(!0,kendo.ui.Alert.prototype.options.localization,{okText:"OK"})),kendo.ui.Confirm&&(kendo.ui.Confirm.prototype.options.messages=e.extend(!0,kendo.ui.Confirm.prototype.options.localization,{okText:"OK",cancel:"Cancel"})),kendo.ui.Prompt&&(kendo.ui.Prompt.prototype.options.messages=e.extend(!0,kendo.ui.Prompt.prototype.options.localization,{okText:"OK",cancel:"Cancel"}))})?a.apply(t,i):a)||(e.exports=r)},361:function(e,t,o){var a,i,r;i=[o(1)],void 0===(r="function"==typeof(a=function(){kendo.cultures["en-GB"]={name:"en-GB",numberFormat:{pattern:["-n"],decimals:2,",":",",".":".",groupSize:[3],percent:{pattern:["-n%","n%"],decimals:2,",":",",".":".",groupSize:[3],symbol:"%"},currency:{name:"British Pound",abbr:"GBP",pattern:["-$n","$n"],decimals:2,",":",",".":".",groupSize:[3],symbol:"£"}},calendars:{standard:{days:{names:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],namesAbbr:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],namesShort:["Su","Mo","Tu","We","Th","Fr","Sa"]},months:{names:["January","February","March","April","May","June","July","August","September","October","November","December"],namesAbbr:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},AM:["AM","am","AM"],PM:["PM","pm","PM"],patterns:{d:"dd/MM/yyyy",D:"dd MMMM yyyy",F:"dd MMMM yyyy HH:mm:ss",g:"dd/MM/yyyy HH:mm",G:"dd/MM/yyyy HH:mm:ss",m:"d MMMM",M:"d MMMM",s:"yyyy'-'MM'-'dd'T'HH':'mm':'ss",t:"HH:mm",T:"HH:mm:ss",u:"yyyy'-'MM'-'dd HH':'mm':'ss'Z'",y:"MMMM yyyy",Y:"MMMM yyyy"},"/":"/",":":":",firstDay:1}}}})?a.apply(t,i):a)||(e.exports=r)}}]);