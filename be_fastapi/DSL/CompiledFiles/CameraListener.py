# Generated from Camera.g4 by ANTLR 4.9.2
from antlr4 import *
if __name__ is not None and "." in __name__:
    from .CameraParser import CameraParser
else:
    from CameraParser import CameraParser

# This class defines a complete listener for a parse tree produced by CameraParser.
class CameraListener(ParseTreeListener):

    # Enter a parse tree produced by CameraParser#program.
    def enterProgram(self, ctx:CameraParser.ProgramContext):
        pass

    # Exit a parse tree produced by CameraParser#program.
    def exitProgram(self, ctx:CameraParser.ProgramContext):
        pass


    # Enter a parse tree produced by CameraParser#command.
    def enterCommand(self, ctx:CameraParser.CommandContext):
        pass

    # Exit a parse tree produced by CameraParser#command.
    def exitCommand(self, ctx:CameraParser.CommandContext):
        pass


    # Enter a parse tree produced by CameraParser#condition.
    def enterCondition(self, ctx:CameraParser.ConditionContext):
        pass

    # Exit a parse tree produced by CameraParser#condition.
    def exitCondition(self, ctx:CameraParser.ConditionContext):
        pass


    # Enter a parse tree produced by CameraParser#orCondition.
    def enterOrCondition(self, ctx:CameraParser.OrConditionContext):
        pass

    # Exit a parse tree produced by CameraParser#orCondition.
    def exitOrCondition(self, ctx:CameraParser.OrConditionContext):
        pass


    # Enter a parse tree produced by CameraParser#andCondition.
    def enterAndCondition(self, ctx:CameraParser.AndConditionContext):
        pass

    # Exit a parse tree produced by CameraParser#andCondition.
    def exitAndCondition(self, ctx:CameraParser.AndConditionContext):
        pass


    # Enter a parse tree produced by CameraParser#compare.
    def enterCompare(self, ctx:CameraParser.CompareContext):
        pass

    # Exit a parse tree produced by CameraParser#compare.
    def exitCompare(self, ctx:CameraParser.CompareContext):
        pass


    # Enter a parse tree produced by CameraParser#obj.
    def enterObj(self, ctx:CameraParser.ObjContext):
        pass

    # Exit a parse tree produced by CameraParser#obj.
    def exitObj(self, ctx:CameraParser.ObjContext):
        pass


    # Enter a parse tree produced by CameraParser#operations.
    def enterOperations(self, ctx:CameraParser.OperationsContext):
        pass

    # Exit a parse tree produced by CameraParser#operations.
    def exitOperations(self, ctx:CameraParser.OperationsContext):
        pass


    # Enter a parse tree produced by CameraParser#expr.
    def enterExpr(self, ctx:CameraParser.ExprContext):
        pass

    # Exit a parse tree produced by CameraParser#expr.
    def exitExpr(self, ctx:CameraParser.ExprContext):
        pass



del CameraParser