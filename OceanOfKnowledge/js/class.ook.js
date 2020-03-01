const xhr = require('superagent');
const HoloJs = require("./holojs.js");

const config = {
    instance_name:"test-instance",
    conductor_endpoint:'http://localhost:8888'  
  }

class Ook {
    async setup() {
        this.page = new HoloJs({"name" : "pages"}, config)
        await this.page.setup();
        this.block = new HoloJs({"name" :"blocks"}, config)
        await this.block.setup();
        this.tag = new HoloJs({"name" :"tags"}, config)
        await this.tag.setup();  
        this.language = new HoloJs({"name" :"languages"}, config)
        await this.language.setup();   
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

    async addPage(markdown_content,params) {
            let page_addr = await this.page.add({
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
        let page_addr = await this.page.update({
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


module.exports = Ook;