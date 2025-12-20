# Generated from .\Violations.g4 by ANTLR 4.9.2
from antlr4 import *
if __name__ is not None and "." in __name__:
    from .ViolationsParser import ViolationsParser
else:
    from ViolationsParser import ViolationsParser

# This class defines a complete listener for a parse tree produced by ViolationsParser.
class ViolationsListener(ParseTreeListener):

    # Enter a parse tree produced by ViolationsParser#violationRule.
    def enterViolationRule(self, ctx:ViolationsParser.ViolationRuleContext):
        pass

    # Exit a parse tree produced by ViolationsParser#violationRule.
    def exitViolationRule(self, ctx:ViolationsParser.ViolationRuleContext):
        pass


    # Enter a parse tree produced by ViolationsParser#condition.
    def enterCondition(self, ctx:ViolationsParser.ConditionContext):
        pass

    # Exit a parse tree produced by ViolationsParser#condition.
    def exitCondition(self, ctx:ViolationsParser.ConditionContext):
        pass


    # Enter a parse tree produced by ViolationsParser#expression.
    def enterExpression(self, ctx:ViolationsParser.ExpressionContext):
        pass

    # Exit a parse tree produced by ViolationsParser#expression.
    def exitExpression(self, ctx:ViolationsParser.ExpressionContext):
        pass


    # Enter a parse tree produced by ViolationsParser#comparator.
    def enterComparator(self, ctx:ViolationsParser.ComparatorContext):
        pass

    # Exit a parse tree produced by ViolationsParser#comparator.
    def exitComparator(self, ctx:ViolationsParser.ComparatorContext):
        pass


    # Enter a parse tree produced by ViolationsParser#value.
    def enterValue(self, ctx:ViolationsParser.ValueContext):
        pass

    # Exit a parse tree produced by ViolationsParser#value.
    def exitValue(self, ctx:ViolationsParser.ValueContext):
        pass


    # Enter a parse tree produced by ViolationsParser#stringList.
    def enterStringList(self, ctx:ViolationsParser.StringListContext):
        pass

    # Exit a parse tree produced by ViolationsParser#stringList.
    def exitStringList(self, ctx:ViolationsParser.StringListContext):
        pass


    # Enter a parse tree produced by ViolationsParser#numberList.
    def enterNumberList(self, ctx:ViolationsParser.NumberListContext):
        pass

    # Exit a parse tree produced by ViolationsParser#numberList.
    def exitNumberList(self, ctx:ViolationsParser.NumberListContext):
        pass



del ViolationsParser