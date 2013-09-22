function grapholVm() {
    var p_blocks = new Array();
    var p_end = true;
    var p_IR  = {BASE:0,ADDR:-1};
    var p_stack = new Array();
    var self = this;
    
    this.registerInstruction = function(psInstruction, pidBlock) {
        var idBlock = 0;
        var instructions = null;
        if(pidBlock!=null) idBlock = pidBlock;
        if(idBlock>=p_blocks.length) p_blocks[idBlock] = new Array();
        instructions = p_blocks[idBlock];
        instructions[instructions.length] = psInstruction;
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
        graphol = new CGraphol();
        p_end = false;
        p_IR = {BASE:0,ADDR:-1};

        while (!p_end) {
            p_IR.ADDR++;
            eval(p_blocks[p_IR.BASE][p_IR.ADDR]);
        }
    }
    
    this.clear = function() {
        p_blocks = new Array();
    }
    
    this.call = function(pidBlock) {
        p_stack.push(p_IR);
        p_IR = {BASE:pidBlock,ADDR:-1};
        
    }
    
    this.callback = function(pidBlock) {
        p_IR = p_stack.pop();    
    }
    
    this.endExec = function() {
        p_end=true;
    }
    
}