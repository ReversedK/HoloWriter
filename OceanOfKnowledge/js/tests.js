

const Ook = require("./class.ook.js");


 async function main() {   
  let ook = new Ook();
  console.log(ook);
  await ook.setup();
 let content =`An h1 header
 ============
 
 Paragraphs are separated by a blank line.
 
 2nd paragraph. *Italic*, **bold**, and monospace. Itemized lists
 look like:
 
   * this one
   * that one
   * the other one
 
 Note that --- not considering the asterisk --- the actual text
 content starts at 4-columns in.
 
 > Block quotes are
 > written like so.
 >
 > They can span multiple paragraphs,
 > if you like.
 
 Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it's all
 in chapters 12--14"). Three dots ... will be converted to an ellipsis.
 Unicode is supported. ☺
 
 
 
 An h2 header
 ------------
 
 Here's a numbered list:
 
  1. first item
  2. second item
  3. third item
 
 Note again how the actual text starts at 4 columns in (4 characters
 from the left side). Here's a code sample:
 
     # Let me re-iterate ...
     for i in 1 .. 10 { do-something(i) }
 
 As you probably guessed, indented 4 spaces. By the way, instead of
 indenting the block, you can use delimited blocks, if you like:
 
 ~~~
 define foobar() {
     print "Welcome to flavor country!";
 }
 ~~~'`;

 let params = { 
   lang : "Français",
   code:"FR_fr",
   name : "Ma première page",
   author : "myAgentAddr",
  tags : "tag1,tag2,tag3"};
 await ook.addPage(content,params);
 let x = await  ook.getPages({"and":{"tags":{"contains":["tag1"]}}});
 console.log("found pages:::",x);
  x = await  ook.getTags({"and":{"name":{"contains":["tag2","tag"]}}});  
 console.log("found tags:::",x); 
 }
 main();