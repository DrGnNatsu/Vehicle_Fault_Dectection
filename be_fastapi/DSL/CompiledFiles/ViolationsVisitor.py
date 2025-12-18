# Generated from .\Violations.g4 by ANTLR 4.9.2
from antlr4 import *
if __name__ is not None and "." in __name__:
    from .ViolationsParser import ViolationsParser
else:
    from ViolationsParser import ViolationsParser

# This class defines a complete generic visitor for a parse tree produced by ViolationsParser.

class ViolationsVisitor(ParseTreeVisitor):

    # Visit a parse tree produced by ViolationsParser#violationRule.
    def visitViolationRule(self, ctx:ViolationsParser.ViolationRuleContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by ViolationsParser#condition.
    def visitCondition(self, ctx:ViolationsParser.ConditionContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by ViolationsParser#expression.
    def visitExpression(self, ctx:ViolationsParser.ExpressionContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by ViolationsParser#comparator.
    def visitComparator(self, ctx:ViolationsParser.ComparatorContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by ViolationsParser#value.
    def visitValue(self, ctx:ViolationsParser.ValueContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by ViolationsParser#stringList.
    def visitStringList(self, ctx:ViolationsParser.StringListContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by ViolationsParser#numberList.
    def visitNumberList(self, ctx:ViolationsParser.NumberListContext):
        return self.visitChildren(ctx)



del ViolationsParser