# Generated from /Users/nguyenbinh/Developer/PPL/Vehicle_Fault_Dectection/be_fastapi/DSL/Camera.g4 by ANTLR 4.9.2
from antlr4 import *
if __name__ is not None and "." in __name__:
    from .CameraParser import CameraParser
else:
    from CameraParser import CameraParser

# This class defines a complete generic visitor for a parse tree produced by CameraParser.

class CameraVisitor(ParseTreeVisitor):

    # Visit a parse tree produced by CameraParser#prog.
    def visitProg(self, ctx:CameraParser.ProgContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by CameraParser#command.
    def visitCommand(self, ctx:CameraParser.CommandContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by CameraParser#condition.
    def visitCondition(self, ctx:CameraParser.ConditionContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by CameraParser#clause.
    def visitClause(self, ctx:CameraParser.ClauseContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by CameraParser#expr.
    def visitExpr(self, ctx:CameraParser.ExprContext):
        return self.visitChildren(ctx)



del CameraParser