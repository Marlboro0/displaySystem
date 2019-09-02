var wrap=new Vue({
    el:'#vmm',
    data:{
        // items:[],
        // ele:0,
        // ele1:0,
        // items1:[],
        // ele2:0,
        // items2:[],
        nameList:['智慧龙华运管项目','智慧福田运管项目','智慧南山运管项目','智慧保安运管项目'],
        indexSrc:'',
        pro:{'name':'龙华运管项目','link':'http//www.192.160.4.52/pp.html','ioc':'http://www.yuanyin.com/media/k2/items/cache/e02fde07d49ee258cc3f6d1b19207757_S.png'},
    },
    methods:{
        addCore:function(){
            this.pro.core.length ++;
        },
        addField:function(){
            this.pro.field.length ++;
        },
        addModule:function(){
            this.pro.module.length ++;
        },
        deleteCore:function(){
            var dom=document.getElementById('coreWrap');
            this.func(dom,this.pro.core)
        },
        deleteField:function(){
            var dom=document.getElementById('fieldWrap');
            this.func(dom,this.pro.field)
            
        },
        deleteModule:function(){
            var dom=document.getElementById('moduleWrap');
            this.func(dom,this.pro.module)
            
        },
        func:function(dom,a){
            var flag=0;
            for(let i=0;i<dom.children.length;i++){
                console.log(dom.children[i])
                if(dom.children[i].getElementsByClassName('check')[0].checked==true){
                    
                    // dom.children[i].remove();
                    a.splice(i,1)
                    flag=0;
                }else{
                    flag=1;
                }
            }
            if(flag==1){
                    alert("请勾选你所想删除项!")
            }
        },
        selectProByName:function(){
            var name=this.$refs.selectPro.value;
            // console.log(name)
            axios.get('/displaySystem/selectProByName?name='+name)
            .then(function(result){
                this.nameList=result
            })
        },
        deleteProByName:function(event){
            alert('are you sure?')
            var name =this.getName(event)
            this.nameList.forEach(function(currentValue , index , arr){
                if(currentValue==name)
                    arr.splice(index,1)
            });
            axios.get('/displaySystem/deleteProByName?name='+name)
            .then(function(result){
                alert(name+'删除成功！')
            })
        },
        changePro:function(event){
            var name =this.getName(event)
            axios.get('/displaySystem/changeProByName?name='+name)
            .then(function(result){
                 this.pro=result;
            })
        },
        upIoc:function(){
            var proIoc=document.getElementById('proIoc').files;
            this.pro.ioc=this.getBase(proIoc);
        },
        upProSrc:function(){
            var base="";
            var proSrc=document.getElementById('proSrc').files;
            if(proSrc.length>1){
                base=[];
                for(var i=1;i<proSrc.length;i++){
                    base.push(this.getBase(proSrc[i]));
                }
            }else{
               base=this.getBase(proSrc);
            }
            this.pro.proSrc=this.getBase(proSrc);
        },
        upOneSrc:function(){
            var oneSrc=document.getElementById('oneSrc').files;
            this.pro.oneSrc=this.getBase(oneSrc);
        },
        upmoduleSrc:function(){
            var moduleSrc=document.getElementById('moduleSrc').files;
            this.pro.module.moduleSrc=this.getBase(moduleSrc);
        },
        upcoreIoc:function(){
            var coreIoc=document.getElementById('coreIoc').files;
            this.pro.core.coreIoc=this.getBase(coreIoc);
        },
        upcoreSrc:function(){
            var coreSrc=document.getElementById('coreSrc').files;
            this.pro.core.coreSrc=this.getBase(coreSrc);
        },
        upfieldSrc:function(){
            var fieldSrc=document.getElementById('fieldSrc').files;
            this.pro.field.fieldSrc=this.getBase(fieldSrc);
        },
        newPro:function(){
            this.pro={}
        },
        pushPro:function(){
            axios.get('/displaySystem/UpdatePro',{
                 params:{
                     src:this.pro
                 }
            })
            .then(function(result){
                 alert('项目更新成功')
            })
        },
        upindexSrc:function(){
            var base='';
            var fileList=document.getElementById('indexSrc').files;
            if(fileList.length>1){
                base=[];
                for(var i=1;i<fileList.length;i++){
                    base.push(this.getBase(fileList[i]));
                }
            }else{
               base=this.getBase(fileList);
            }
            this.indexSrc=base;
            axios.get('/displaySystem/updateCarousel',{
                 params:{
                     src:base
                 }
            })
            .then(function(result){
                 alert('首页轮播图上传成功')
            })
        },
        getBase:function(file){
            var reader=new FileReader();
            var imgFile;
            reader.onload=function(e){
                alert('读取完成')
                imgFile=e.target.result;
                return imgFile;
            }
            reader.readAsDataURL(file);
        },
        selectImage:function(e){
            console.log(e.srcElement)
            // var file=e.srcElement.files[0];
            // var imgURL=window.URL.createObjectURL(file);
            // console.log(imgURL)
            var reader=new FileReader();
            reader.onload=function(evt){
                image=evt.target.result;
                console.log(image)
            }
        },
        getName:function(event){
            event || (event = window.event);
            var name=event.target.parentElement.parentElement.children[0].innerText;
            return name;
        }
    },
    created() {
        axios.get('/displaySystem/selectProByName')
        .then(function(nameList){
            this.nameList=nameList
        })
    },
});
var vm=new Vue({
    el:"#index",
    data:{
        result:[{name:'智慧龙华项目运管项目',ioc:'http://www.yuanyin.com/media/k2/items/cache/e02fde07d49ee258cc3f6d1b19207757_S.png',generalize:'以深圳龙华为智慧城市原型，以公共安全，数据交换，经济统计数据为核心，分析展示了城市运营综合管理系统模块；'},
                {name:'智慧龙华项目运管项目',ioc:'http://www.yuanyin.com/media/k2/items/cache/e02fde07d49ee258cc3f6d1b19207757_S.png',generalize:'以深圳龙华为智慧城市原型，以公共安全，数据交换，经济统计数据为核心，分析展示了城市运营综合管理系统模块；'},
                {name:'智慧龙华项目运管项目',ioc:'http://www.yuanyin.com/media/k2/items/cache/e02fde07d49ee258cc3f6d1b19207757_S.png',generalize:'以深圳龙华为智慧城市原型，以公共安全，数据交换，经济统计数据为核心，分析展示了城市运营综合管理系统模块；'}],
        src:[{src:'http://www.wengegroup.com/img/banner1.jpg'},{src:'http://www.wengegroup.com/img/banner1.jpg'}],
        nameList:['智慧龙华项目运管项目','智慧龙华项目运管项目','智慧龙华项目运管项目','智慧龙华项目运管项目'],
    },
    methods: {
        display:function(event){
            event || (event = window.event);
            event.target.lastChild.style.display="block";
        },
        unDisplay:function(event){
            event || (event = window.event);
            event.target.lastChild.style.display="none";
        },
        toDetail:function(event){
            event||(event=window.event)
            console.log(event)
        }
    },
    created() {
        axios.get('/displaySystem/getProject')
        .then(function(result){
            this.result=result
        })
        axios.get('/displaySystem/getCarousel')
        .then(function(src){
            this.src=src;
        })
        axios.get('/displaySystem/selectproByName')
        .then(function(nameList){
            this.nameList=nameList;
        })
    },
})