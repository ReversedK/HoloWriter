import HoloJs from "./holojs.js";
const xhr = require('superagent');


const config = {
    instance_name:"test-instance",
    conductor_endpoint:'http://localhost:8888'  
  }

export default class Ook {
    async init(){
        console.log("-------------- INIT");
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
        Unicode is supported. ☺ `;
       
        let params = { 
          lang : "Français",
          code:"FR_fr",
          name : "Ma première page",
          author : "myAgentAddr",
         tags : "tag1,tag2,tag3"
        };
        await this.addPage(content,params);
    }

    async setup() {       
        this.page = new HoloJs({"name" : "pages","addr":"QmSC9tWDRWGdtYWRYJHvVmtXsG64hhrNSpgGDtMGYrvS8L"}, config)
        await this.page.setup();
        this.block = new HoloJs({"name" :"blocks","addr":"QmeD9ZayJ5oAvKcvhFbaHy7dZtHiNz87pVRyFphpNSUCRc"}, config)
        await this.block.setup();
        this.tag = new HoloJs({"name" :"tags","addr":"QmQgPbYPTMo6eCur8w2YcTQvvFqnkLFuT7pZq5QvKA9Y2m"}, config)
        await this.tag.setup();  
        this.language = new HoloJs({"name" :"languages","addr":"QmVZSGQ4aTUTes1GnKsRguLnAPb6vhNBbByVYm29BXJZKi"}, config)
        await this.language.setup();   
    }

    async getLanguageList(){
        return this.languages;
        
    }

    async addLanguage(name,code,page_addr){   
    this.languages = await this.language.find();   
    let lang_addr;
    if(this.languages.items.filter((e)=>JSON.parse(e.item).code==code).length) lang_addr = this.languages.items[0].addr; else {    
      lang_addr =  this.language.add({"name":name,"code":code});      
    }      
      await this.page.link_bidirectional(page_addr,lang_addr,"lang","page");          
    }

    async addTags(params,page_addr){
        params.tags.split(",").forEach(async(tag)=>{
            let tag_addr = await this.tag.add({"name":tag,'lang':params.code});                
            // link  tag to  page
            let r = await this.tag.link_bidirectional(page_addr,tag_addr, "tags","tags")
        });  
    }

    async getPage(addr){
       return  this.page.get(addr);
    }

    async addPage(markdown_content,params) {
            let page_addr = await this.page.add({
                "name" : params.title,                
                "content":markdown_content,
                "lang" : params.code,
                "tags" : params.tags,
                "author" : params.author       
            });
            if(!page_addr) return false; 
            this.addLanguage(params.lang,params.code);  
            if(params.tags.length) this.addTags(params,page_addr); 
    }

     async clearTags() {}

    async updatePage(markdown_content,params,page_addr) {
         page_addr = await this.page.update({
            "content":markdown_content,
            "lang" : params.code,
            "tags" : params.tags ,
            "author" : params.author  
        },page_addr);
        if(!page_addr) return false;        
        if(params.tags.length) this.addTags(params,page_addr);
}


    async search(search){
        let r = await this.page.find(search);    
        return r.items.map((entry)=>{
            let x = JSON.parse(entry.item);
            x.addr = entry.addr;
            return x
        });
    }

    async getPagesForTag(tag_addr){
        let tag_post = await this.tag.findLinkedItems(tag_addr,"tags",{});
        console.log("pages for this tag",tag_post);
    }
    async getTags(search){
        let r = await this.tag.find(search);
        return r.items
    }
    

}

