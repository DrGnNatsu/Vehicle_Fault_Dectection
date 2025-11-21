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
        buf.write("%\4\2\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\3\2\3\2\3\2")
        buf.write("\3\3\3\3\3\3\3\3\3\3\3\4\3\4\3\4\3\4\6\4\31\n\4\r\4\16")
        buf.write("\4\32\3\5\3\5\3\5\3\5\5\5!\n\5\3\6\3\6\3\6\2\2\7\2\4\6")
        buf.write("\b\n\2\3\3\2\t\n\2\"\2\f\3\2\2\2\4\17\3\2\2\2\6\30\3\2")
        buf.write("\2\2\b \3\2\2\2\n\"\3\2\2\2\f\r\5\4\3\2\r\16\7\2\2\3\16")
        buf.write("\3\3\2\2\2\17\20\7\7\2\2\20\21\5\6\4\2\21\22\7\b\2\2\22")
        buf.write("\23\5\n\6\2\23\5\3\2\2\2\24\25\5\b\5\2\25\26\t\2\2\2\26")
        buf.write("\31\3\2\2\2\27\31\5\b\5\2\30\24\3\2\2\2\30\27\3\2\2\2")
        buf.write("\31\32\3\2\2\2\32\30\3\2\2\2\32\33\3\2\2\2\33\7\3\2\2")
        buf.write("\2\34\35\7\4\2\2\35\36\7\5\2\2\36!\7\4\2\2\37!\7\4\2\2")
        buf.write(" \34\3\2\2\2 \37\3\2\2\2!\t\3\2\2\2\"#\7\3\2\2#\13\3\2")
        buf.write("\2\2\5\30\32 ")
        return buf.getvalue()


class CameraParser ( Parser ):

    grammarFileName = "Camera.g4"

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    sharedContextCache = PredictionContextCache()

    literalNames = [ "<INVALID>", "'s\u01A1n'", "<INVALID>", "<INVALID>", 
                     "<INVALID>", "'IF'", "'THEN'", "'AND'", "'OR '", "'IS '", 
                     "'FOR '", "'>'", "'<'", "'=='", "'!='" ]

    symbolicNames = [ "<INVALID>", "<INVALID>", "OBJECT", "OPERATION", "IDENTIFIER", 
                      "IF", "THEN", "AND", "OR", "IS", "FOR", "GREATER_THAN", 
                      "LOWER_THAN", "EQUAL", "NOT_EQUAL" ]

    RULE_program = 0
    RULE_command = 1
    RULE_condition = 2
    RULE_clause = 3
    RULE_expr = 4

    ruleNames =  [ "program", "command", "condition", "clause", "expr" ]

    EOF = Token.EOF
    T__0=1
    OBJECT=2
    OPERATION=3
    IDENTIFIER=4
    IF=5
    THEN=6
    AND=7
    OR=8
    IS=9
    FOR=10
    GREATER_THAN=11
    LOWER_THAN=12
    EQUAL=13
    NOT_EQUAL=14

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
            self.state = 10
            self.command()
            self.state = 11
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
            self.state = 13
            self.match(CameraParser.IF)
            self.state = 14
            self.condition()
            self.state = 15
            self.match(CameraParser.THEN)
            self.state = 16
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

        def clause(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(CameraParser.ClauseContext)
            else:
                return self.getTypedRuleContext(CameraParser.ClauseContext,i)


        def AND(self, i:int=None):
            if i is None:
                return self.getTokens(CameraParser.AND)
            else:
                return self.getToken(CameraParser.AND, i)

        def OR(self, i:int=None):
            if i is None:
                return self.getTokens(CameraParser.OR)
            else:
                return self.getToken(CameraParser.OR, i)

        def getRuleIndex(self):
            return CameraParser.RULE_condition




    def condition(self):

        localctx = CameraParser.ConditionContext(self, self._ctx, self.state)
        self.enterRule(localctx, 4, self.RULE_condition)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 22 
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while True:
                self.state = 22
                self._errHandler.sync(self)
                la_ = self._interp.adaptivePredict(self._input,0,self._ctx)
                if la_ == 1:
                    self.state = 18
                    self.clause()
                    self.state = 19
                    _la = self._input.LA(1)
                    if not(_la==CameraParser.AND or _la==CameraParser.OR):
                        self._errHandler.recoverInline(self)
                    else:
                        self._errHandler.reportMatch(self)
                        self.consume()
                    pass

                elif la_ == 2:
                    self.state = 21
                    self.clause()
                    pass


                self.state = 24 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                if not (_la==CameraParser.OBJECT):
                    break

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ClauseContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def OBJECT(self, i:int=None):
            if i is None:
                return self.getTokens(CameraParser.OBJECT)
            else:
                return self.getToken(CameraParser.OBJECT, i)

        def OPERATION(self):
            return self.getToken(CameraParser.OPERATION, 0)

        def getRuleIndex(self):
            return CameraParser.RULE_clause




    def clause(self):

        localctx = CameraParser.ClauseContext(self, self._ctx, self.state)
        self.enterRule(localctx, 6, self.RULE_clause)
        try:
            self.state = 30
            self._errHandler.sync(self)
            la_ = self._interp.adaptivePredict(self._input,2,self._ctx)
            if la_ == 1:
                self.enterOuterAlt(localctx, 1)
                self.state = 26
                self.match(CameraParser.OBJECT)

                self.state = 27
                self.match(CameraParser.OPERATION)
                self.state = 28
                self.match(CameraParser.OBJECT)
                pass

            elif la_ == 2:
                self.enterOuterAlt(localctx, 2)
                self.state = 29
                self.match(CameraParser.OBJECT)
                pass


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
        self.enterRule(localctx, 8, self.RULE_expr)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 32
            self.match(CameraParser.T__0)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx





