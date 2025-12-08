# Generated from ./Camera.g4 by ANTLR 4.9.2
# encoding: utf-8
from antlr4 import *
from io import StringIO
import sys
if sys.version_info[1] > 5:
	from typing import TextIO
else:
	from typing.io import TextIO


def serializedATN():
    with StringIO() as buf:
        buf.write("\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\20")
        buf.write("<\4\2\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b")
        buf.write("\t\b\4\t\t\t\4\n\t\n\3\2\3\2\3\2\3\3\3\3\3\3\3\3\3\3\3")
        buf.write("\4\3\4\3\5\3\5\3\5\7\5\"\n\5\f\5\16\5%\13\5\3\6\3\6\3")
        buf.write("\6\7\6*\n\6\f\6\16\6-\13\6\3\7\3\7\3\7\3\7\3\b\3\b\3\b")
        buf.write("\5\b\66\n\b\3\t\3\t\3\n\3\n\3\n\2\2\13\2\4\6\b\n\f\16")
        buf.write("\20\22\2\3\3\2\13\16\2\65\2\24\3\2\2\2\4\27\3\2\2\2\6")
        buf.write("\34\3\2\2\2\b\36\3\2\2\2\n&\3\2\2\2\f.\3\2\2\2\16\62\3")
        buf.write("\2\2\2\20\67\3\2\2\2\229\3\2\2\2\24\25\5\4\3\2\25\26\7")
        buf.write("\2\2\3\26\3\3\2\2\2\27\30\7\5\2\2\30\31\5\6\4\2\31\32")
        buf.write("\7\6\2\2\32\33\5\22\n\2\33\5\3\2\2\2\34\35\5\b\5\2\35")
        buf.write("\7\3\2\2\2\36#\5\n\6\2\37 \7\b\2\2 \"\5\n\6\2!\37\3\2")
        buf.write("\2\2\"%\3\2\2\2#!\3\2\2\2#$\3\2\2\2$\t\3\2\2\2%#\3\2\2")
        buf.write("\2&+\5\f\7\2\'(\7\7\2\2(*\5\f\7\2)\'\3\2\2\2*-\3\2\2\2")
        buf.write("+)\3\2\2\2+,\3\2\2\2,\13\3\2\2\2-+\3\2\2\2./\5\16\b\2")
        buf.write("/\60\5\20\t\2\60\61\5\16\b\2\61\r\3\2\2\2\62\65\7\17\2")
        buf.write("\2\63\64\7\3\2\2\64\66\7\17\2\2\65\63\3\2\2\2\65\66\3")
        buf.write("\2\2\2\66\17\3\2\2\2\678\t\2\2\28\21\3\2\2\29:\7\4\2\2")
        buf.write(":\23\3\2\2\2\5#+\65")
        return buf.getvalue()


class CameraParser ( Parser ):

    grammarFileName = "Camera.g4"

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    sharedContextCache = PredictionContextCache()

    literalNames = [ "<INVALID>", "'.'", "'TERMINATED'", "'IF'", "'THEN'", 
                     "'AND'", "'OR'", "'IS'", "'FOR'", "'=='", "'!='", "'>'", 
                     "'<'" ]

    symbolicNames = [ "<INVALID>", "<INVALID>", "<INVALID>", "IF", "THEN", 
                      "AND", "OR", "IS", "FOR", "EQUAL", "NOT_EQUAL", "GREATER_THAN", 
                      "LOWER_THAN", "IDENTIFIER", "WS" ]

    RULE_program = 0
    RULE_command = 1
    RULE_condition = 2
    RULE_orCondition = 3
    RULE_andCondition = 4
    RULE_compare = 5
    RULE_obj = 6
    RULE_operations = 7
    RULE_expr = 8

    ruleNames =  [ "program", "command", "condition", "orCondition", "andCondition", 
                   "compare", "obj", "operations", "expr" ]

    EOF = Token.EOF
    T__0=1
    T__1=2
    IF=3
    THEN=4
    AND=5
    OR=6
    IS=7
    FOR=8
    EQUAL=9
    NOT_EQUAL=10
    GREATER_THAN=11
    LOWER_THAN=12
    IDENTIFIER=13
    WS=14

    def __init__(self, input:TokenStream, output:TextIO = sys.stdout):
        super().__init__(input, output)
        self.checkVersion("4.9.2")
        self._interp = ParserATNSimulator(self, self.atn, self.decisionsToDFA, self.sharedContextCache)
        self._predicates = None




    class ProgramContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def command(self):
            return self.getTypedRuleContext(CameraParser.CommandContext,0)


        def EOF(self):
            return self.getToken(CameraParser.EOF, 0)

        def getRuleIndex(self):
            return CameraParser.RULE_program




    def program(self):

        localctx = CameraParser.ProgramContext(self, self._ctx, self.state)
        self.enterRule(localctx, 0, self.RULE_program)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 18
            self.command()
            self.state = 19
            self.match(CameraParser.EOF)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class CommandContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def IF(self):
            return self.getToken(CameraParser.IF, 0)

        def condition(self):
            return self.getTypedRuleContext(CameraParser.ConditionContext,0)


        def THEN(self):
            return self.getToken(CameraParser.THEN, 0)

        def expr(self):
            return self.getTypedRuleContext(CameraParser.ExprContext,0)


        def getRuleIndex(self):
            return CameraParser.RULE_command




    def command(self):

        localctx = CameraParser.CommandContext(self, self._ctx, self.state)
        self.enterRule(localctx, 2, self.RULE_command)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 21
            self.match(CameraParser.IF)
            self.state = 22
            self.condition()
            self.state = 23
            self.match(CameraParser.THEN)
            self.state = 24
            self.expr()
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ConditionContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def orCondition(self):
            return self.getTypedRuleContext(CameraParser.OrConditionContext,0)


        def getRuleIndex(self):
            return CameraParser.RULE_condition




    def condition(self):

        localctx = CameraParser.ConditionContext(self, self._ctx, self.state)
        self.enterRule(localctx, 4, self.RULE_condition)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 26
            self.orCondition()
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class OrConditionContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def andCondition(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(CameraParser.AndConditionContext)
            else:
                return self.getTypedRuleContext(CameraParser.AndConditionContext,i)


        def OR(self, i:int=None):
            if i is None:
                return self.getTokens(CameraParser.OR)
            else:
                return self.getToken(CameraParser.OR, i)

        def getRuleIndex(self):
            return CameraParser.RULE_orCondition




    def orCondition(self):

        localctx = CameraParser.OrConditionContext(self, self._ctx, self.state)
        self.enterRule(localctx, 6, self.RULE_orCondition)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 28
            self.andCondition()
            self.state = 33
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while _la==CameraParser.OR:
                self.state = 29
                self.match(CameraParser.OR)
                self.state = 30
                self.andCondition()
                self.state = 35
                self._errHandler.sync(self)
                _la = self._input.LA(1)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class AndConditionContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def compare(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(CameraParser.CompareContext)
            else:
                return self.getTypedRuleContext(CameraParser.CompareContext,i)


        def AND(self, i:int=None):
            if i is None:
                return self.getTokens(CameraParser.AND)
            else:
                return self.getToken(CameraParser.AND, i)

        def getRuleIndex(self):
            return CameraParser.RULE_andCondition




    def andCondition(self):

        localctx = CameraParser.AndConditionContext(self, self._ctx, self.state)
        self.enterRule(localctx, 8, self.RULE_andCondition)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 36
            self.compare()
            self.state = 41
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while _la==CameraParser.AND:
                self.state = 37
                self.match(CameraParser.AND)
                self.state = 38
                self.compare()
                self.state = 43
                self._errHandler.sync(self)
                _la = self._input.LA(1)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class CompareContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def obj(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(CameraParser.ObjContext)
            else:
                return self.getTypedRuleContext(CameraParser.ObjContext,i)


        def operations(self):
            return self.getTypedRuleContext(CameraParser.OperationsContext,0)


        def getRuleIndex(self):
            return CameraParser.RULE_compare




    def compare(self):

        localctx = CameraParser.CompareContext(self, self._ctx, self.state)
        self.enterRule(localctx, 10, self.RULE_compare)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 44
            self.obj()
            self.state = 45
            self.operations()
            self.state = 46
            self.obj()
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ObjContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def IDENTIFIER(self, i:int=None):
            if i is None:
                return self.getTokens(CameraParser.IDENTIFIER)
            else:
                return self.getToken(CameraParser.IDENTIFIER, i)

        def getRuleIndex(self):
            return CameraParser.RULE_obj




    def obj(self):

        localctx = CameraParser.ObjContext(self, self._ctx, self.state)
        self.enterRule(localctx, 12, self.RULE_obj)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 48
            self.match(CameraParser.IDENTIFIER)
            self.state = 51
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            if _la==CameraParser.T__0:
                self.state = 49
                self.match(CameraParser.T__0)
                self.state = 50
                self.match(CameraParser.IDENTIFIER)


        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class OperationsContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def EQUAL(self):
            return self.getToken(CameraParser.EQUAL, 0)

        def NOT_EQUAL(self):
            return self.getToken(CameraParser.NOT_EQUAL, 0)

        def GREATER_THAN(self):
            return self.getToken(CameraParser.GREATER_THAN, 0)

        def LOWER_THAN(self):
            return self.getToken(CameraParser.LOWER_THAN, 0)

        def getRuleIndex(self):
            return CameraParser.RULE_operations




    def operations(self):

        localctx = CameraParser.OperationsContext(self, self._ctx, self.state)
        self.enterRule(localctx, 14, self.RULE_operations)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 53
            _la = self._input.LA(1)
            if not((((_la) & ~0x3f) == 0 and ((1 << _la) & ((1 << CameraParser.EQUAL) | (1 << CameraParser.NOT_EQUAL) | (1 << CameraParser.GREATER_THAN) | (1 << CameraParser.LOWER_THAN))) != 0)):
                self._errHandler.recoverInline(self)
            else:
                self._errHandler.reportMatch(self)
                self.consume()
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ExprContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser


        def getRuleIndex(self):
            return CameraParser.RULE_expr




    def expr(self):

        localctx = CameraParser.ExprContext(self, self._ctx, self.state)
        self.enterRule(localctx, 16, self.RULE_expr)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 55
            self.match(CameraParser.T__1)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx





