function grapholVm() {
    var p_instructions = new Array();
    this.registerInstruction = function(psInstruction) {
        p_instructions[p_instructions.length] = psInstruction;
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

        for (var i = 0; i < p_instructions.length; i++)
            eval(p_instructions[i]);

    }
}