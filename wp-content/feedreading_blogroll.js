
jQuery(function($){if($('.feedreading_blogroll_bookmarklist').length>0){$.getScript("http://www.google.com/jsapi",function(){google.load("feeds","1",{"callback":initializeBR});});}
function sprintf(){if(sprintf.arguments.length<2){return;}
var data=sprintf.arguments[0];for(var k=1;k<sprintf.arguments.length;++k){switch(typeof(sprintf.arguments[k])){case'string':data=data.replace(/%s/,sprintf.arguments[k]);break;case'number':data=data.replace(/%d/,sprintf.arguments[k]);break;case'boolean':data=data.replace(/%b/,sprintf.arguments[k]?'true':'false');break;default:break;}}
return(data);}
if(!String.sprintf){String.sprintf=sprintf;}
function getAge(days,hours){if(days>1){return String.sprintf("%d days ago",days);}else if(days==1){return"yesterday ";}else if(days<1&&hours>1){return String.sprintf("%d hrs ago",hours);}else if(days<1&&hours==1){return"in the last hour";}else if(days<1&&hours<1){return"just recently";}}
function addAge(feed,bookmark,anchor,divID,previewtoggle,last_posttitle){var $li=$(bookmark),$a=$(anchor),$toggle=$(previewtoggle),$title=$(last_posttitle),now=(new Date()).getTime(),then=(new Date()).getTime(),ageInDays,ageInHours,randomAge,ageMsg=[],$snippet,entry;entry=feed.entries[0];try{then=new Date(entry.publishedDate).getTime();}catch(dateException){}
ageInDays=Math.floor((now-then)/(1000*60*60*24)),ageInHours=Math.floor((now-then)%(1000*60*60*24)/3600000);try{$entryTitle=$("<p></p>").html(entry.title);$a.attr({title:$entryTitle.html()});}catch(titleException){$a.attr({title:""});}
if(!isNaN(then)){$li.attr({age:then});}else{randomAge=Math.floor(Math.random()*1000001);$li.attr({age:randomAge});}
return false;}
function addZeroAge(zeroAgeBookmark){var $zali=$(zeroAgeBookmark),randomAge=Math.floor(Math.random()*10000001);if($zali!==null){$zali.attr({age:randomAge});}
return false;}
function addFeedControl(preview,feed,name){var feedControl=new google.feeds.FeedControl();feedControl.addFeed(feed,name);feedControl.draw($(preview).get(0));return false;}
function feedreading_limit_display(){var
liArray=$("#feedreading_blogroll_ > li");for(var i=0;i<liArray.length;i++){if(i>-1){$(liArray[i]).css("display","none");}}return false;}
function feedreading_automatic_sort(){var $allCompleted=false,$hasCompleteAge=true,isComplete=false,$sortArray=$("#feedreading_blogroll_ >li");for(var i=0;i<$sortArray.length;i++){var $age_=$($sortArray[i]).attr("age");if($age_===null||$age_==""||isNaN($age_)){$hasCompleteAge=false;}}
if($sortArray.length==0){$hasCompleteAge=true;}
if($hasCompleteAge&&!isComplete){try{$("#feedreading_blogroll_ > li").frbrsort(sortAlpha).appendTo("#feedreading_blogroll_ ");isComplete=true;}catch(e){}}
$allCompleted=$hasCompleteAge;if($allCompleted){clearInterval(myInterval);}
return false;}
function feedreading_rolling(){var
$blogroll_all=$('#feedreading_blogroll_'),$blogroll_all_size=$blogroll_all.find('li').size(),$blogroll_all_limit=($blogroll_all_size>5)?(5):($blogroll_all_size-1);$('#feedreading_blogroll_ > li').css("display","none");$blogroll_all.feedReadingBlogrollSpy($blogroll_all_limit,4000);return false;}
function feedreading_category_observer(){$("ul.feedreading_blogroll_bookmarklist").bind("mouseenter",function(event){var $eventTarget=$(event.target);$eventTarget.parents(".feedreading_blogroll_bookmarklist").addClass("mouseover");});$("ul.feedreading_blogroll_bookmarklist").bind("mouseleave",function(event){var $eventTarget=$(event.target);$eventTarget.parents(".feedreading_blogroll_bookmarklist").removeClass("mouseover");});return false;}
function initializeBR(){feedreading_category_observer();return false;}
$.fn.feedReadingBlogrollSpy=function(limit,interval){limit=limit||4;interval=interval||4000;return this.each(function(){var $list=$(this),items=[],currentItem=limit,total=0,height=$list.find('li:first').height();$list.find('li').each(function(){items.push($(this));});total=items.length;$list.wrap('<div class="spyWrapper" />').parent().css({height:height*(limit+2)});$list.find('li').filter(':gt('+(limit-1)+')').remove();function spy(){if(!$list.hasClass("mouseover")){var $insert=$(items[currentItem]).css({height:0,opacity:0,display:'none'}).prependTo($list);$list.find('li:last').animate({opacity:0},1000,function(){$insert.animate({height:height},1000).animate({opacity:1},1000);$insert.show();$(this).remove();});currentItem++;if(currentItem>=total){currentItem=0;}}
setTimeout(spy,interval);}
spy();});};$.fn.frbrsort=function(){return this.pushStack([].sort.apply(this,arguments),[]);};function sortAlpha(a,b){return parseInt($(a).attr("age"))<parseInt($(b).attr("age"))?1:-1;};});