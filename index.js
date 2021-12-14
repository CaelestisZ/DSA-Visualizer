var type=0;
var index=0;
$(function(){
    
    // format
    // $(selector).mouseenter(function)
    // specifies the function to run when the mouseenter function is triggered

    $('.nav').click(function(){ 
        type=$(this).index();
    	$(this).addClass('selected');
    	$(this).siblings().removeClass('selected');
    });
    
    $('.btn').click(function(){
        index=$(this).index();
        var name=$(this).attr('id');
        if(name.indexOf('Compare')!=-1){
            name='compareSort';
        }
        if(name.indexOf('Search')!=-1){
            name='search';
        }
    	var current=$(this).parent('.buttonList').children().eq(index);
    	$(current).css('background','rgb(68, 68, 229)');
    	$(current).siblings().css('background','');
        var indexP=$(this).parents('.arithmeticList').index();
    	$(this).parents('.arithmeticList').siblings('.arithmeticList').children('.buttonList').children().css('background','');
        var items=document.getElementsByTagName('a');
    	items[indexP].href=name+".html";
        // alert(items[indexP].href);
    });

    //mouseenter code
    $('.length').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.init').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.serialNumber').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.insertNumber').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });
    
    $('.insertGo').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.deleteNumber').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });


    $('.deleteGo').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subS1').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subS2').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subS3').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subT1').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subT2').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subU1').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subU2').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subU3').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });
    
    $('.subX1').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subX2').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subX3').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subX4').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subC1').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subC2').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subV1').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subV2').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subW1').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subW2').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subW3').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subY1').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subY2').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subY3').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subA1').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subD1').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.subH1').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

     $('.subB1').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.singleStarts p').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.stackStarts p').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.queueStarts p').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.graphDFSStarts p').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });
    
    $('.primStarts p').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.kruStarts p').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.dijStarts p').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.compareSortStarts p').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.radixSortStarts p').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.patternStarts p').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.searchStarts p').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.avlTreeStarts p').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });
    
    $('.heapStarts p').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.bstTreeStarts p').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    $('.BT2TStarts p').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(89, 229, 89)');
    });

    //mouseover to remove the edge color
    $('.codes p').mouseenter(function(){
        $(this).css('background','black');
    }).mouseleave(function(){
        $(this).css('background','rgb(62, 62, 228)');
    });
    

    //Algo status
    var stateFlag=1;
    $('.stateHide').click(function(){
        if(stateFlag==0){
            $(this).children().css('transform','rotate(360deg)');
        setTimeout('$(".state").show()',100);
            $('.state').animate({
                'width':'350px',
            },300);
            stateFlag=1;
        }else{
            $(this).children().css('transform','rotate(180deg)');
        setTimeout('$(".state").hide()',100);
            $('.state').animate({
                'width':'0px',
            },100);
            stateFlag=0;
        }
    });
    //Algo code line
    var codeFlag=0;
    $('.codeHide').click(function(){
        if(codeFlag==0){
            $(this).children().css('transform','rotate(360deg)');
            setTimeout('$(".codes").show()',100);
            $('.codes').animate({
                 'width':'350px',
            },200);
            codeFlag=1;
        }else{
            $(this).children().css('transform','rotate(180deg)');
            setTimeout('$(".codes").hide()',100);
            $('.codes').animate({
                 'width':'0px',
            },200);
            codeFlag=0;
        }
    });

     
     //Stack code starts here
     var stackStartFlag=0;  
     $('.startHide').click(function(){
        if(stackStartFlag==0){
            $(this).children().css('transform','rotate(180deg)');
            setTimeout('$(".stackStarts").show()',100);
            $('.stackStarts').animate({
                  'width':   '140px',
            },200);
            stackStartFlag=1;
        }else{
            $(this).children().css('transform','rotate(360deg)');
            setTimeout('$(".stackStarts").hide()',100);
            $('.subS1').hide();
            $('.subS2').hide();
            $('.subS3').hide();
            $('.stackStarts').animate({
                  'width':   '0px',
            },200);
            stackStartFlag=0;
        }
        
    });

     $('.stackStarts p').click(function(){
        var str=$(this).attr('class');
        var s=str[str.length-1];

        for (var i = 1; i < 4; i++) {
            if(i!=s){
                $('.subS'+i).hide();
            }
            else{    
                $('.subS'+s).show();
                $('.stackLength span,input').show()
                $('.stackInit p').show();
                $('.stackInit').animate({
                     'width':'80px'
                },10);
        
                $('.stackLength').animate({
                     'width':'200px'
                },10);
            }
        };

    });
    //stack array initialization
    $('.stackInit').click(function(){
        var length=$('.InputLength').val();
        if(length!=''){
            currentStack.initCallBack(length) ;
        }else{

        }
        $('.InputLength').val(' ');
    });
    //push
    $('.insertStack').click(function(){
        var number=$('.stackInputNumber').val();
        if(number!=''){
            currentStack.pushCallBack(number) ;
        }else{
          
        }
        $('.stackInputNumber').val(' ');
    });
    //pop
    $('.outStack').click(function(){
        currentStack.popCallBack() ;
    });

    //singly linked list code
    //1000ms = 1 sec
     var singleStartFlag=0;  
     $('.singleStartHide').click(function(){
        if(singleStartFlag==0){
            $(this).children().css('transform','rotate(180deg)');
            setTimeout('$(".singleStarts").show()',100);
            $('.singleStarts').animate({
                  'width':   '140px',
            },200);
            singleStartFlag=1;
        }else{
            $(this).children().css('transform','rotate(360deg)');
            setTimeout('$(".singleStarts").hide()',100);
            $('.subT1').hide();
            $('.subT2').hide();
            $('.singleStarts').animate({
                  'width':   '0px',
            },200);
            singleStartFlag=0;
        }
        
    });

    $('.singleStarts p').click(function(){
        var str=$(this).attr('class');
        var s=str[str.length-1];
        for (var i = 1; i < 4; i++) {
            if(i!=s){
                $('.subT'+i).hide();
            }
            else{    
                $('.subT'+s).show();
                $('.singleLength span,input').show()
                $('.singleInit p').show();
                $('.singleInit').animate({
                     'width':'80px'
                },10);
        
                $('.singleLength').animate({
                     'width':'200px'
                },10);
            }
        };

    });
    //inser data into sll
    $('.singleInsert').click(function(){
        var serial=$('.singleSerial').val();
        var number=$('.singleInputNumber').val();
        if(serial!=''&&number!=''){
           currentLinkList.insertCallBack(serial,number);
        }else{}
    });
    //delete data from sll
    $('.singleDelete').click(function(){
        var serial=$('.singleDelNumber').val();
        if(serial!=''){
           currentLinkList.deleteCallBack(serial);
        }else{}
    });


    //queue code
    var queueStartFlag=0;  
    $('.startHide').click(function(){
        if(queueStartFlag==0){
            $(this).children().css('transform','rotate(180deg)');
            setTimeout('$(".queueStarts").show()',100);
            $('.queueStarts').animate({
                  'width':   '140px',
            },200);
            queueStartFlag=1;
        }else{
            $(this).children().css('transform','rotate(360deg)');
            setTimeout('$(".queueStarts").hide()',100);
            $('.subU1').hide();
            $('.subU2').hide();
            $('.subU3').hide();
            $('.queueStarts').animate({
                  'width':   '0px',
            },200);
            queueStartFlag=0;
        }
        
    });

    $('.queueStarts p').click(function(){
        var str=$(this).attr('class');
        var s=str[str.length-1];

        for (var i = 1; i < 4; i++) {
            if(i!=s){
                $('.subU'+i).hide();
            }
            else{    
                $('.subU'+s).show();
                // $('.queueLength span,input').show()
                // $('.queueInit p').show();
                // $('.queueInit').animate({
                //      'width':'80px'
                // },10);
        
                // $('.queueLength').animate({
                //      'width':'200px'
                // },10);
            }
        };

    });
    //queue array init
    $('.queueInit').click(function(){
        var length=$('.qInputLength').val();
        if(length!=''){
            currentQueue.initCallBack(length) ;
        }else{

        }
        $('.InputLength').val(' ');
    });
    //enqueue
    $('.insertQueue').click(function(){
        var number=$('.queueInputNumber').val();
        if(number!=''){
            currentQueue.pushCallBack(number) ;
        }else{
          
        }
        $('.queueInputNumber').val(' ');
    });
    //dequeue
    $('.outQueue').click(function(){
        currentQueue.popCallBack() ;
    });

    //--------------------------------------------------------------------------------
    //figure
    //DFS Traversal

    var graphStartFlag=0;  
    $('.graphStartHide').click(function(){
        if(graphStartFlag==0){
            $(this).children().css('transform','rotate(180deg)');
            setTimeout('$(".graphDFSStarts").show()',100);
            $('.graphDFSStarts').animate({
                  'width':   '140px',
            },200);
            graphStartFlag=1;
        }else{
            $(this).children().css('transform','rotate(360deg)');
            setTimeout('$(".graphDFSStarts").hide()',100);
            $('.subX1').hide();
            $('.subX2').hide();
            $('.subX3').hide();
            $('.subX4').hide();
            $('.graphDFSStarts').animate({
                  'width':   '0px',
            },200);
            graphStartFlag=0;
        }
        
    });

    $('.graphDFSStarts p').click(function(){
        var str=$(this).attr('class');
        var s=str[str.length-1];

        for (var i = 1; i < 5; i++) {
            if(i!=s){
                $('.subX'+i).hide();
            }
            else{    
                $('.subX'+s).show();
            }
        };
    });
    
    //generate random graph
    $('.createGraph').click(function(){
        var peakNumber=parseInt($('.peakNumber').val());
        if(!isNaN(peakNumber)) {
            vertexNumSelectChangeCallBack(peakNumber);
            randomGraphCallBack();
        }
        else {
            randomGraphCallBack();
        }
        // $('.peakNumber').val('');
    });

    //add edge
    $('.addEdge').click(function(){
        var startNumber=parseInt( $('.startNumber').val() );
        var endNumber=parseInt( $('.endNumber').val() );
        var weight=parseInt( $('.weightNumber').val() );
        // alert('st:'+startNumber +' en:'+endNumber+' we:'+ weight);
        if ( !isNaN(startNumber) && !isNaN(endNumber)) {
            addEdgeCallBack(startNumber, endNumber, weight);
        }
        // $('.startNumber').val('');
        // $('.endNumber').val('');
    });
    //delete edge
    $('.deleteEdge').click(function(){
        var startNumber=parseInt($('.startNumber').val());
        var endNumber=parseInt($('.endNumber').val());
        if ( !isNaN(startNumber) && !isNaN(endNumber) ) {
            delEdgeCallBack(startNumber, endNumber);
        }
        // $('.startNumber').val('');
        // $('.endNumber').val('');
    });
    //run DFS
    $('.DFS').click(function(){
        var runNumber=parseInt($('.runNumber').val());
        runDFSCallBack(runNumber);
        // $('.runNumber').val('');
    });
    //run BFS
    $('.BFS').click(function(){
        var runNumber=parseInt($('.runNumber').val());
        runBFSCallBack(runNumber);
        // $('.runNumber').val('');
    });
    // configuration options
    // show edge weights
    $('#displayWeight').click(function() {
        showEdgeWeightSwitch($('#displayWeight')[0].checked);
    })
    //select directed graph
    $('.radio1').click(function(){
        directedGraphSwitch(true);
    });
    //select undirected graph
    $('.radio2').click(function(){
        directedGraphSwitch(false);
    });
    // $("#displayWeight:checked").bind(function(){
    //     alert('displayWeight checked');
    // });
    // $("#displayWeight").checked.bind(function(){
    //     alert('displayWeight checked');
    // });
    //prim
    var primStartFlag=0;
    $('.primStartHide').click(function(){
        if(primStartFlag==0){
            $(this).children().css('transform','rotate(180deg)');
            setTimeout('$(".primStarts").show()',100);
            $('.primStarts').animate({
                  'width':   '140px',
            },200);
            primStartFlag=1;
        }else{
            $(this).children().css('transform','rotate(360deg)');
            setTimeout('$(".primStarts").hide()',100);
            $('.subX1').hide();
            $('.subX2').hide();
            $('.subX3').hide();
            $('.primStarts').animate({
                  'width':   '0px',
            },200);
            primStartFlag=0;
        }
        
    });

    $('.primStarts p').click(function(){
        var str=$(this).attr('class');
        var s=str[str.length-1];

        for (var i = 1; i < 5; i++) {
            if(i!=s){
                $('.subX'+i).hide();
            }
            else{    
                $('.subX'+s).show();
            }
        };
    });

    //generate random graph
    $('.createPrimGraph').click(function(){
        var peakNumber=parseInt($('.peakPrimNumber').val());
        if(!isNaN(peakNumber)) {
            vertexNumSelectChangeCallBack(peakNumber);
            randomGraphCallBack();
        }
        else {
            randomGraphCallBack();
        }
        $('.peakPrimNumber').val('');
    });

    //add edge
    $('.addPrimEdge').click(function(){
        var startNumber=parseInt( $('.startPrimNumber').val() );
        var endNumber=parseInt( $('.endPrimNumber').val() );
        var weight=parseInt( $('.weightPrimNumber').val() );
        // alert('st:'+startNumber +' en:'+endNumber+' we:'+ weight);
        if ( !isNaN(startNumber) && !isNaN(endNumber)) {
            addEdgeCallBack(startNumber, endNumber, weight);
        }
        $('.startPrimNumber').val('');
        $('.endPrimNumber').val('');
    });
    //delete edge
    $('.deletePrimEdge').click(function(){
        var startNumber=parseInt($('.startPrimNumber').val());
        var endNumber=parseInt($('.endPrimNumber').val());
        if ( !isNaN(startNumber) && !isNaN(endNumber) ) {
            delEdgeCallBack(startNumber, endNumber);
        }
        $('.startPrimNumber').val('');
        $('.endprimNumber').val('');
    });
    //run prim
    $('.Prim').click(function(){
        var runNumber=parseInt($('.runPrimNumber').val());
        runPrimCallBack(runNumber);
        // $('.runPrimNumber').val('');
    });

    //kruskal's algorithm
    var kruStartFlag=0;
    $('.kruStartHide').click(function(){
        if(kruStartFlag==0){
            $(this).children().css('transform','rotate(180deg)');
            setTimeout('$(".kruStarts").show()',100);
            $('.kruStarts').animate({
                  'width':   '140px',
            },200);
            kruStartFlag=1;
        }else{
            $(this).children().css('transform','rotate(360deg)');
            setTimeout('$(".kruStarts").hide()',100);
            $('.subX1').hide();
            $('.subX2').hide();
            $('.subX3').hide();
            $('.kruStarts').animate({
                  'width':   '0px',
            },200);
            kruStartFlag=0;
        }
        
    });

    $('.kruStarts p').click(function(){
        var str=$(this).attr('class');
        var s=str[str.length-1];

        for (var i = 1; i < 5; i++) {
            if(i!=s){
                $('.subX'+i).hide();
            }
            else{    
                $('.subX'+s).show();
            }
        };
    });

    //generate random graph
    $('.createKruGraph').click(function(){
        var peakNumber=parseInt($('.peakKruNumber').val());
        if(!isNaN(peakNumber)) {
            vertexNumSelectChangeCallBack(peakNumber);
            randomGraphCallBack();
        }
        else {
            randomGraphCallBack();
        }
        $('.peakKruNumber').val('');
    });

    //add edge
    $('.addKruEdge').click(function(){
        var startNumber=parseInt( $('.startKruNumber').val() );
        var endNumber=parseInt( $('.endKruNumber').val() );
        var weight=parseInt( $('.weightKruNumber').val() );
        // alert('st:'+startNumber +' en:'+endNumber+' we:'+ weight);
        if ( !isNaN(startNumber) && !isNaN(endNumber)) {
            addEdgeCallBack(startNumber, endNumber, weight);
        }
        $('.startKruNumber').val('');
        $('.endKruNumber').val('');
    });
    //delete edge
    $('.deleteKruEdge').click(function(){
        var startNumber=parseInt( $('.startKruNumber').val() );
        var endNumber=parseInt( $('.endKruNumber').val() );
        if ( !isNaN(startNumber) && !isNaN(endNumber)) {
            delEdgeCallBack(startNumber, endNumber);
        }
        $('.startKruNumber').val('');
        $('.endKruNumber').val('');
    });
    //run Kruskal
    $('.Kruskal').click(function(){
        // var runNumber=parseInt($('.runKruNumber').val());
        runKruskalCallBack();
        // $('.runKruNumber').val('');
    });

    //Dijkstra
    var dijStartFlag=0;  
    $('.dijStartHide').click(function(){
        if(dijStartFlag==0){
            $(this).children().css('transform','rotate(180deg)');
            setTimeout('$(".dijStarts").show()',100);
            $('.dijStarts').animate({
                  'width':   '140px',
            },200);
            dijStartFlag=1;
        }else{
            $(this).children().css('transform','rotate(360deg)');
            setTimeout('$(".dijStarts").hide()',100);
            $('.subX1').hide();
            $('.subX2').hide();
            $('.subX3').hide();
            $('.subX4').hide();
            $('.dijStarts').animate({
                  'width':   '0px',
            },200);
            dijStartFlag=0;
        }
        
    });

    $('.dijStarts p').click(function(){
        var str=$(this).attr('class');
        var s=str[str.length-1];

        for (var i = 1; i < 5; i++) {
            if(i!=s){
                $('.subX'+i).hide();
            }
            else{    
                $('.subX'+s).show();
            }
        };
    });
    
    //generate random graph
    $('.createDijGraph').click(function(){
        var peakNumber=parseInt($('.peakDijNumber').val());
        if(!isNaN(peakNumber)) {
            vertexNumSelectChangeCallBack(peakNumber);
            randomGraphCallBack();
        }
        else {
            randomGraphCallBack();
        }
        $('.peakDijNumber').val('');
    });

    //add edge
    $('.addDijEdge').click(function(){
        var startNumber=parseInt( $('.startDijNumber').val() );
        var endNumber=parseInt( $('.endDijNumber').val() );
        var weight=parseInt( $('.weightDijNumber').val() );
        // alert('st:'+startNumber +' en:'+endNumber+' we:'+ weight);
        if ( !isNaN(startNumber) && !isNaN(endNumber)) {
            addEdgeCallBack(startNumber, endNumber, weight);
        }
        $('.startDijNumber').val('');
        $('.endDijNumber').val('');
    });
    //delete edge
    $('.deleteDijEdge').click(function(){
        var startNumber=parseInt( $('.startDijNumber').val() );
        var endNumber=parseInt( $('.endDijNumber').val() );
        if ( !isNaN(startNumber) && !isNaN(endNumber)) {
            delEdgeCallBack(startNumber, endNumber);
        }
        $('.startDijNumber').val('');
        $('.endDijNumber').val('');
    });
    //run Dijkstra
    $('.Dijkstra').click(function(){
        var runNumber=parseInt($('.runDijNumber').val());
        runDijkstraCallBack(runNumber);
        // $('.runDijNumber').val('');
    });
    // run Floyd 
    $('.Floyd').click(function() {
        runFloydCallBack();
    });

    //--------------------------------------------------------------------------------
    // sorting algorithms

    // comparison sorts
    var sortStartFlag=0;  
     $('.sortStartHide').click(function(){
        if(sortStartFlag==0){
            $(this).children().css('transform','rotate(180deg)');
            setTimeout('$(".compareSortStarts").show()',100);
            $('.compareSortStarts').animate({
                  'width':   '140px',
            },200);
            sortStartFlag=1;
        }else{
            $(this).children().css('transform','rotate(360deg)');
            setTimeout('$(".compareSortStarts").hide()',100);
            $('.subC1').hide();
            $('.subC2').hide();
            $('.compareSortStarts').animate({
                  'width':   '0px',
            },200);
            sortStartFlag=0;
        }
        
    });
    $('.compareSortStarts p').click(function(){
        var str=$(this).attr('class');
        var s=str[str.length-1];
        for (var i = 1; i < 4; i++) {
            if(i!=s){
                $('.subC'+i).hide();
            }
            else{    
                $('.subC'+s).show();
            }
        };
    });
    //generate sorted array
    $('.createArray').click(function(){
        var length=$('.sortArrayLength').val();
        if(!isNaN(length)){
            currentSort.initCallBack(length);
        }
    });

    // insertion sort
    $('.insertSort').click(function(){
        currentSort.insertSortCallBack();
    });
    // selection sort
    $('.selectSort').click(function(){
        currentSort.selectSortCallBack();
    });
    // bubble sort
    $('.bubbleSort').click(function(){
        currentSort.bubbleSortCallBack();
    });
    // shell sort
    $('.shellSort').click(function(){
        currentSort.shellSortCallBack();
    });
    // quick sort
    $('.quickSort').click(function(){
        currentSort.quickSortCallBack();
    });
    //merge sort
    $('.mergeSort').click(function(){
        currentSort.mergeSortCallBack();
    });

    
    // radix sort
    var radixSortStartFlag=0;  
    $('.sortStartHide').click(function(){
        if(radixSortStartFlag==0){
            $(this).children().css('transform','rotate(180deg)');
            setTimeout('$(".radixSortStarts").show()',100);
            $('.radixSortStarts').animate({
                  'width':   '140px',
            },200);
            radixSortStartFlag=1;
        }else{
            $(this).children().css('transform','rotate(360deg)');
            setTimeout('$(".radixSortStarts").hide()',100);
            $('.subV1').hide();
            $('.subV2').hide();
            $('.radixSortStarts').animate({
                  'width':   '0px',
            },200);
            radixSortStartFlag=0;
        }
        
    });
    $('.radixSortStarts p').click(function(){
        var str=$(this).attr('class');
        var s=str[str.length-1];
        for (var i = 1; i < 4; i++) {
            if(i!=s){
                $('.subV'+i).hide();
            }
            else{    
                $('.subV'+s).show();
            }
        };
    });
    // generate sorted array
    $('.createRadixArray').click(function(){
        var length=$('.sortArrayLength').val();
        if(!isNaN(length)){
            currentSort.initCallBack(length);
        }
    });
    // perform radix sort
    $('.radixSort').click(function(){
        currentSort.radixSortCallBack();
    });
    

    ///Heap sort
    var heapSortStartFlag=0;  
    $('.sortStartHide').click(function(){
        if(heapSortStartFlag==0){
            $(this).children().css('transform','rotate(180deg)');
            setTimeout('$(".heapSortStarts").show()',100);
            $('.heapSortStarts').animate({
                  'width':   '140px',
            },200);
            heapSortStartFlag=1;
        }else{
            $(this).children().css('transform','rotate(360deg)');
            setTimeout('$(".heapSortStarts").hide()',100);
            $('.subHS1').hide();
            $('.subHS2').hide();
            $('.heapSortStarts').animate({
                  'width':   '0px',
            },200);
            heapSortStartFlag=0;
        }
    });
    $('.heapSortStarts p').click(function(){
        var str=$(this).attr('class');
        var s=str[str.length-1];
        for (var i = 1; i < 4; i++) {
            if(i!=s){
                $('.subHS'+i).hide();
            }
            else{    
                $('.subHS'+s).show();
            }
        };
    });
    // generate sorted array
    $('.createHeapArray').click(function(){
        var length=$('.sortArrayLength').val();
        if(!isNaN(length)){
            // alert(length);
            currentSort.initCallBack(length);
        }
    });
    // perform heap sort
    $('.heapSort').click(function(){
        currentSort.HeapSortCallBack();
    });



    //-------------------------------------------------------------------------------
    //strings
    //pattern matching
    var patternStartFlag=0;  
    $('.patternStartHide').click(function(){
        if(patternStartFlag==0){
            $(this).children().css('transform','rotate(180deg)');
            setTimeout('$(".patternStarts").show()',100);
            $('.patternStarts').animate({
                  'width':   '140px',
            },200);
            patternStartFlag=1;
        }else{
            $(this).children().css('transform','rotate(360deg)');
            setTimeout('$(".patternStarts").hide()',100);
            $('.subW1').hide();
            $('.subW2').hide();
            $('.subW3').hide();
            $('.patternStarts').animate({
                  'width':   '0px',
            },200);
            patternStartFlag=0;
        }
        
    });
    $('.patternStarts p').click(function(){
        var str=$(this).attr('class');
        var s=str[str.length-1];
        for (var i = 1; i < 4; i++) {
            if(i!=s){
                $('.subW'+i).hide();
            }
            else{    
                $('.subW'+s).show();
            }
        };
    });
    //generate pattern string
    $('.createPattern').click(function(){
        var str=$('.patternString_de').val();
        if(str){
           currentPatternMatch.patternCallBack(str);
        }else{
            alert('Please enter a pattern string');
        }
    });
    //generate target string
    $('.createTarget').click(function(){
        var str=$('.targetString_de').val();
        if(str){
            currentPatternMatch.targetCallBack(str);
        }else{
            alert('Please enter the target string');
        }
    });
    //KMP matching
    $('.match').click(function(){
        currentPatternMatch.KMPmatchCallBack();
    });
    // the pattern string and target string begin to match
    $('.matchStart').click(function(){
        currentPatternMatch.matchCallBack();
    });

    //find
    var searchStartFlag=0;  
    $('.searchStartHide').click(function(){
        if(searchStartFlag==0){
            $(this).children().css('transform','rotate(180deg)');
            setTimeout('$(".searchStarts").show()',100);
            $('.searchStarts').animate({
                  'width':   '140px',
            },200);
            searchStartFlag=1;
        }else{
            $(this).children().css('transform','rotate(360deg)');
            setTimeout('$(".searchStarts").hide()',100);
            $('.subY1').hide();
            $('.subY2').hide();
            $('.subY3').hide();
            $('.searchStarts').animate({
                  'width':   '0px',
            },200);
            searchStartFlag=0;
        }
    });
    $('.searchStarts p').click(function(){
        var str=$(this).attr('class');
        var s=str[str.length-1];
        for (var i = 1; i < 4; i++) {
            if(i!=s){
                $('.subY'+i).hide();
            }
            else{    
                $('.subY'+s).show();
            }
        };
    });
    //set array size
    $('.setSize').click(function(){
        var size=$('.arraySize').val();
        if(!isNaN(size)){
            currentSearch.initMaxSizeCallBack(size);
        }
    });
    // set array contents
    $('.createSearchArray').click(function(){
        var content=$('.contentDetail').val();
        if(content){
            currentSearch.initArrayCallBack(content);
        }
    });
    //binary search
    $('.binarySearch').click(function(){
        var toSearch=$('.whichOne').val();
        if(toSearch){
            currentSearch.binarySearchCallBack(toSearch);
        }
    });
    //search in order
    $('.sequentialSearch').click(function(){
        var toSearch=$('.whichOne').val();
        if(toSearch){
            currentSearch.linearSearchCallBack(toSearch);
        }
    });

    //------------------------------------------trees-----------------------------------
    //avl tree
    var avlStartFlag=0;  
    $('.treeStartHide').click(function(){
        if(avlStartFlag==0){
            $(this).children().css('transform','rotate(180deg)');
            setTimeout('$(".avlTreeStarts").show()',100);
            $('.avlTreeStarts').animate({
                  'width':   '140px',
            },200);
            avlStartFlag=1;
        }else{
            $(this).children().css('transform','rotate(360deg)');
            setTimeout('$(".avlTreeStarts").hide()',100);
            $('.subA1').hide();
            $('.avlTreeStarts').animate({
                  'width':   '0px',
            },200);
            avlStartFlag=0;
        }
        
    });
    $('.avlTreeStarts p').click(function(){
        var str=$(this).attr('class');
        var s=str[str.length-1];
        for (var i = 1; i < 4; i++) {
            if(i!=s){
                $('.subA'+i).hide();
            }
            else{    
                $('.subA'+s).show();
            }
        };
    });
    //insert
    /*$('.avlAction').click(function(){
        var avlNum=$('.avlNumber').val();
        if(avlNum){
            currentAVLTree.insertCallBack(avlNum);
            $('.avlNumber').val('');
        }
    });
	*/
	// randomly generated
	$('.avlAction').click(function(){
		init();
        currentAVLTree.randomAVLCallBack();
	});
	// randomly delete
	$('.avlDelete').click(function () {
		init();
		currentAVLTree.deleteAVLCallBack();
	});

    //heap
    var heapStartFlag=0;  
    $('.treeStartHide').click(function(){
        if(heapStartFlag==0){
            $(this).children().css('transform','rotate(180deg)');
            setTimeout('$(".heapStarts").show()',100);
            $('.heapStarts').animate({
                  'width':   '140px',
            },200);
            heapStartFlag=1;
        }else{
            $(this).children().css('transform','rotate(360deg)');
            setTimeout('$(".heapStarts").hide()',100);
            $('.subH1').hide();
            $('.heapStarts').animate({
                  'width':   '0px',
            },200);
            heapStartFlag=0;
        }
        
    });
    $('.heapStarts p').click(function(){
        var str=$(this).attr('class');
        var s=str[str.length-1];
        for (var i = 1; i < 4; i++) {
            if(i!=s){
                $('.subH'+i).hide();
            }
            else{    
                $('.subH'+s).show();
            }
        };
    });
    //insert
    $('.heapInsert').click(function(){
        var heapNum=$('.heapNumber').val();
        if(heapNum){
            currentHeap.insertCallBack(heapNum);
            $('.heapNumber').val('');
        }
    });
    //delete
    $('.heapDelete').click(function(){
        var heapNum=$('.heapNumber').val();
        if(heapNum){
            currentHeap.deleteCallBack(heapNum);
            $('.heapNumber').val('');
        }
    });

    // BST Operations
    var bstTreeStartFlag=0;  
    $('.treeStartHide').click(function(){
        if(bstTreeStartFlag==0){
            $(this).children().css('transform','rotate(180deg)');
            setTimeout('$(".bstTreeStarts").show()',100);
            $('.bstTreeStarts').animate({
                  'width':   '140px',
            },200);
            bstTreeStartFlag=1;
        }else{
            $(this).children().css('transform','rotate(360deg)');
            setTimeout('$(".bstTreeStarts").hide()',100);
            $('.subB1').hide();
            $('.bstTreeStarts').animate({
                  'width':   '0px',
            },200);
            bstTreeStartFlag=0;
        }
        
    });
    $('.bstTreeStarts p').click(function(){
        var str=$(this).attr('class');
        var s=str[str.length-1];
        for (var i = 1; i < 4; i++) {
            if(i!=s){
                $('.subB'+i).hide();
            }
            else{    
                $('.subB'+s).show();
            }
        };
    });
    //insert
    $('.bstTreeInsert').click(function(){
        var bstTreeNum=$('.bstTreeNumber').val();
        if(bstTreeNum){
            currentBST.insertCallBack(bstTreeNum);
            $('.bstTreeNumber').val('');
        }
    });
    //find
    $('.bstTreeSearch').click(function(){
        var bstTreeNum=$('.bstTreeNumber').val();
        if(bstTreeNum){
            currentBST.searchCallBack(bstTreeNum);
            $('.bstTreeNumber').val('');
        }
    });
    //delete
    $('.bstTreeDelete').click(function(){
        var bstTreeNum=$('.bstTreeNumber').val();
        if(bstTreeNum){
            currentBST.deleteCallBack(bstTreeNum);
            $('.bstTreeNumber').val('');
        }
    });
    
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // conversion of trees and forests
    var BT2TStartFlag=0;  
    $('.treeBT2TStartHide').click(function(){
        if(BT2TStartFlag==0){
            $(this).children().css('transform','rotate(180deg)');
            setTimeout('$(".BT2TStarts").show()',100);
            $('.BT2TStarts').animate({
                  'width':   '140px',
            },200);
            BT2TStartFlag=1;
        }else{
            $(this).children().css('transform','rotate(360deg)');
            setTimeout('$(".BT2TStarts").hide()',100);
            $('.subD1').hide();
            $('.BT2TStarts').animate({
                  'width':   '0px',
            },200);
            BT2TStartFlag=0;
        }
        
    });
    $('.BT2TStarts p').click(function(){
        var str=$(this).attr('class');
        var s=str[str.length-1];
        for (var i = 1; i < 5; i++) {
            if(i!=s){
                $('.subD'+i).hide();
            }
            else{    
                $('.subD'+s).show();
            }
        };
    });
    var actionFlag=0;
    //Choose binary tree or tree
    $('#treeStyle').change(function(){
        var treeStyle=$(this).val();
        if(treeStyle=='bTree'){
            $('#zuoyou').removeAttr('disabled');
            $('.BCreateLine').find('p').css('color','#fff');
            actionFlag=0;
        }else{
            $('#zuoyou').attr('disabled','true');
            $('.BCreateLine').find('p').css('color','graytext');
            actionFlag=1;
        }
        currentBT2T.selectStyleButtonCallBack(treeStyle);
    });
	var canInsert = 1;
    //Generate edges
    $('.BCreateLine').click(function(){
        var parentNode=$('.parentNodeDetail').val();
        var nodePosition=$('#zuoyou').val();
        var childNode=$('.childNodeDetail').val();
        if((actionFlag==0)&&(canInsert == 1)){
            currentBT2T.createButtonCallBack(parentNode,nodePosition,childNode);
        }else{
            alert('Cannot generate edges');
        }
    });
    // conversion
    $('.transformP').click(function(){
        currentBT2T.changeButtonCallBack();
		canAutoPlay = 0;
		//alert("Inner function1 canAutoPlay" + canAutoPlay);
    });
    // refresh
	var canAutoPlay = 1;
    $('.updateP').click(function(){
        currentBT2T.newButtonCallBack();
    });

    
    // automatic presentation
    $('.BT2TAction').click(function(){
        init();
        currentBT2T.autoBTreeToTree();
        currentBT2T.changeButtonCallBack("bTree");
    });

    $('.T2BTAction').click(function(){
        init();
        currentBT2T.createConstTreeCallBack(0);
        currentBT2T.changeButtonCallBack("Tree");
    });
    
});
function ini(){
 	        var url=document.location.search;
 	        index=url[1];
            type=index;
            $('.navList').children().eq(type).addClass('selected');
            $('.navList').children().eq(type).siblings().removeClass('selected');
}
function back(){
	window.location.href="index.html";
}
function enterFun(obj){
    $(obj).css('background','black');
}
function leaveFun(obj){
    $(obj).css('background','rgb(89, 229, 89)');
}