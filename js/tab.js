;(function($){

   class Tab{
       //构造器
       constructor(element,options){
       
        this.element =element;//获取element
        this.getConfig(options); //合并配置参数
        this.initDom();//初始化dom
        this.setName();
        this.getName();
        console.log(this.element);
        console.log(this);
        console.log("options",options);
        console.log("setting",this.setting)
        console.log("defaults",$.fn.Tab.defaults)
       }
       //初始化dom结构
       initDom(){
            var _this = this;
           this.tabItems=this.element.find("ul.tab-nav li");
           this.conentItems = this.element.find("div.content-wrap div.content-item");
           var setting = this.setting;

           if(setting.triggerType ==="click"){
               this.tabItems.bind(setting.triggerType,function(){
                   _this.invoke($(this));
                //    console.log("click",$(this));
               });
           }else if(setting.tabItemsTye==="mouseover" ||setting.triggerType!='click'){
               this.tabItems.bind("mouseover",function(){
                _this.invoke($(this));
                // console.log("mouseover");
               })
           };
           //当配置了时间就进行自动切换
        //    console.log(this.setting.auto)
        //    console.log(this.element);
            // if(this.setting.auto){
            //     //计数器 计时器
            //     this.timer = null;
            //     this.loop = 0;
            //     this.autoPlay();
            //     this.element.hover(function(){
            //         window.clearInterval(_this.timer);
            //     },function () {  
            //         _this.autoPlay();
            //     })
            // }

            // //设置默认显示第几个tab
            // if(this.setting.invoke>0){
            //     this.invoke(this.tabItems.eq(this.setting.invoke-1));
            // }

       }
       //获取配置参数
       getConfig(options){
        this.setting = $.extend($.fn.Tab.defaults, options ||{});

       }
       // 事件驱动函数 进行标记的切换以及显示隐藏的操作
       invoke(currentTab){
            var setting = this.setting;
            var index = currentTab.index();
            //  要执行tab的选中状态
            currentTab.addClass("actived").siblings().removeClass("actived");
            //  当前选中的要加上active
            //  切换对应的tab内容，要根据effect是default还是fade
            if(setting.effect === "default" || setting.effect!=="fade"){
                this.conentItems.eq(index).addClass("current").siblings().removeClass("current");
            }else if(setting.effect === "fade"){
                this.conentItems.eq(index).fadeIn().siblings().fadeOut();;
            }
            this.setName();
            //如果设置了自动切换，记得把当前的loop设置成当前tab的index
            if(setting.auto){
                this.loop = index;
            }
       }
       //自动播放
       autoPlay(){
        var _this = this;
        var tabItems = this.tabItems;
        var tabLength = tabItems.size();
        var setting = this.setting;
        //设置定时器
        this.timer = window.setInterval(function(){
            _this.loop++;
            if(_this.loop>=tabLength){
                _this.loop=0;
            }
            tabItems.eq(_this.loop).trigger(setting.triggerType);
            if(_this.setting.auto){
                tabItems.eq(_this.loop).trigger("mouseout");
            }
        },
        setting.auto);
        console.log(this.loop);
       }

       setName(){
            this.name = this.setting.name;
       }

       getName(){
           console.log(this.name)
       }

   }

    //动态方法就需要生成实例
    $.fn.Tab = function(options){
        return this.each(function(){
            var _this = $(this);
            instance = _this.data("Tab");
                //_this ==>tab里的element
            if(!instance){
                instance = new Tab(_this,options);
                _this.data("Tab",instance);
            }
            if($.type(options) === "string")
            return instance[options](); //调用tab里的方法
        })
    }
    $.fn.Tab.defaults={
        //定义鼠标的触发类型
        triggerType:'click',
        //tab的切换效果 直接切换还是淡入淡出效果
        effect:"fade",
        //默认展示第几个tab
        invoke:1,
        //用来定义tab是否自定切换 当设置时间间隔就表示自动切换，并且自动切换时间间隔
        auto:false,
        name:"tab"
    }

})(jQuery)