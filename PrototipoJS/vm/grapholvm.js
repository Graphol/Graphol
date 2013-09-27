function grapholVm() {
    var p_blocks = new Array(); //Armazena o c�digo compilado dividido em blocos
    var p_threads = new Array(); //Armazena as v�rias linhas de execu��o
    var p_currThread = -1;
    var p_end = true;
    var self = this;
    var stdout = new Stdout();
    
    this.registerInstruction = function(psInstruction, pidBlock) {
        var idBlock = 0;
        var instructions = null;
        if(pidBlock!=null) idBlock = pidBlock;
        if(idBlock>=p_blocks.length) p_blocks[idBlock] = new Array();
        instructions = p_blocks[idBlock];
        instructions[instructions.length] = psInstruction;
    }
    this.getNewBlockId = function() {
        return p_blocks.length; 
    }
    
    /*******************************************************************************
     *$FC exec Executar
     *
     *$ED Descri��o da Fun��o
     *    Executa o c�digo fonte, no momento, dando um eval sobre o c�digo compilado
     *    
     *$EP Par�metros da Fun��o
     *
     *$P  p_out C�digo Compilado - String 
     *      Ao Entrar: Cont�m o c�digo compilado
     *
     *******************************************************************************/
    this.exec = function() {
        var thread;
        var graphol;
        p_end = false;
        newThread();

        while (!p_end) {
            thread=nextThread();
            graphol=thread.IR.SCOPE;
            thread.IR.ADDR++;
            eval(p_blocks[thread.IR.BASE][thread.IR.ADDR]);
        }
    }
    
    this.clear = function() {
        p_blocks = new Array();
        p_threads = new Array();
    }
    
    this.call = function(pBlock) {
        var thread;
        if(pBlock.isAsync()) thread=newThread();
        else thread=getCurrThread();
        if(pBlock.isSync()){
            thread.STACK.push(thread.IR);
            thread.IR = {
                BASE:pBlock.getId(),
                ADDR:-1,
                SCOPE: new CGraphol(stdout),
                PARENT:thread.IR.BASE
            };
        } else thread.IR.BASE = pBlock.getId();
        thread.IR.SCOPE.set("inbox",pBlock.inbox);
    }
    
    
    this.callback = function() {
        var thread=getCurrThread();
        if(thread.STACK.length>0) thread.IR = thread.STACK.pop();
        else removeThread();
    }
    
    var newThread = function() {
        var thread = {
            IR: {
                BASE:0,
                ADDR:-1, 
                SCOPE: new CGraphol(stdout),
                PARENT:null
            },
            STACK: new Array()
        } 
        p_threads[p_threads.length] = thread;  
        return thread;
    }
    
    var removeThread = function(){
        p_threads.splice(p_currThread,1);
    }
    
    var nextThread = function() {
        p_currThread++;
        if(p_currThread>=p_threads.length) p_currThread=0;
        return p_threads[p_currThread];
    }
    
    var getCurrThread = function() {
        return p_threads[p_currThread];
    }
    
    this.endExec = function() {
        p_end=true;
    }
    
}