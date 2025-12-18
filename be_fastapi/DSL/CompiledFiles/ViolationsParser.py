# Generated from .\Violations.g4 by ANTLR 4.9.2
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
        buf.write("\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\37")
        buf.write("d\4\2\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b")
        buf.write("\t\b\3\2\3\2\3\2\3\2\3\2\3\2\3\3\3\3\3\3\7\3\32\n\3\f")
        buf.write("\3\16\3\35\13\3\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3")
        buf.write("\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4")
        buf.write("\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\5")
        buf.write("\4C\n\4\3\5\3\5\3\6\3\6\3\6\3\6\3\6\5\6L\n\6\3\7\3\7\3")
        buf.write("\7\3\7\7\7R\n\7\f\7\16\7U\13\7\3\7\3\7\3\b\3\b\3\b\3\b")
        buf.write("\7\b]\n\b\f\b\16\b`\13\b\3\b\3\b\3\b\2\2\t\2\4\6\b\n\f")
        buf.write("\16\2\4\3\2\17\20\3\2\21\27\2j\2\20\3\2\2\2\4\26\3\2\2")
        buf.write("\2\6B\3\2\2\2\bD\3\2\2\2\nK\3\2\2\2\fM\3\2\2\2\16X\3\2")
        buf.write("\2\2\20\21\7\r\2\2\21\22\5\4\3\2\22\23\7\16\2\2\23\24")
        buf.write("\7\3\2\2\24\25\7\2\2\3\25\3\3\2\2\2\26\33\5\6\4\2\27\30")
        buf.write("\t\2\2\2\30\32\5\6\4\2\31\27\3\2\2\2\32\35\3\2\2\2\33")
        buf.write("\31\3\2\2\2\33\34\3\2\2\2\34\5\3\2\2\2\35\33\3\2\2\2\36")
        buf.write("\37\7\4\2\2\37 \5\b\5\2 !\5\n\6\2!C\3\2\2\2\"#\7\5\2\2")
        buf.write("#$\5\b\5\2$%\7\32\2\2%C\3\2\2\2&\'\7\6\2\2\'(\5\b\5\2")
        buf.write("()\7\33\2\2)C\3\2\2\2*+\7\7\2\2+,\5\b\5\2,-\7\33\2\2-")
        buf.write("C\3\2\2\2./\7\b\2\2/\60\7\34\2\2\60\61\7\32\2\2\61\62")
        buf.write("\7\35\2\2\62\63\5\b\5\2\63\64\7\33\2\2\64\65\7\t\2\2\65")
        buf.write("C\3\2\2\2\66\67\7\n\2\2\678\5\b\5\289\7\f\2\29C\3\2\2")
        buf.write("\2:;\7\13\2\2;<\5\b\5\2<=\7\32\2\2=C\3\2\2\2>?\7\34\2")
        buf.write("\2?@\5\4\3\2@A\7\35\2\2AC\3\2\2\2B\36\3\2\2\2B\"\3\2\2")
        buf.write("\2B&\3\2\2\2B*\3\2\2\2B.\3\2\2\2B\66\3\2\2\2B:\3\2\2\2")
        buf.write("B>\3\2\2\2C\7\3\2\2\2DE\t\3\2\2E\t\3\2\2\2FL\7\32\2\2")
        buf.write("GL\7\33\2\2HL\7\f\2\2IL\5\f\7\2JL\5\16\b\2KF\3\2\2\2K")
        buf.write("G\3\2\2\2KH\3\2\2\2KI\3\2\2\2KJ\3\2\2\2L\13\3\2\2\2MN")
        buf.write("\7\34\2\2NS\7\32\2\2OP\7\36\2\2PR\7\32\2\2QO\3\2\2\2R")
        buf.write("U\3\2\2\2SQ\3\2\2\2ST\3\2\2\2TV\3\2\2\2US\3\2\2\2VW\7")
        buf.write("\35\2\2W\r\3\2\2\2XY\7\34\2\2Y^\7\33\2\2Z[\7\36\2\2[]")
        buf.write("\7\33\2\2\\Z\3\2\2\2]`\3\2\2\2^\\\3\2\2\2^_\3\2\2\2_a")
        buf.write("\3\2\2\2`^\3\2\2\2ab\7\35\2\2b\17\3\2\2\2\7\33BKS^")
        return buf.getvalue()


class ViolationsParser ( Parser ):

    grammarFileName = "Violations.g4"

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    sharedContextCache = PredictionContextCache()

    literalNames = [ "<INVALID>", "'TRIGGER_VIOLATION'", "'object.class_name'", 
                     "'object.current_zone'", "'object.speed_kmh'", "'object.direction_angle'", 
                     "'object.zone_duration_seconds'", "'SECONDS'", "'object.attributes.has_helmet'", 
                     "'scene.traffic_light_color'", "<INVALID>", "'IF'", 
                     "'THEN'", "'AND'", "'OR'", "'IN'", "'=='", "'!='", 
                     "'>'", "'<'", "'>='", "'<='", "'true'", "'false'", 
                     "<INVALID>", "<INVALID>", "'('", "')'", "','" ]

    symbolicNames = [ "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "BOOLEAN", "IF", "THEN", 
                      "AND", "OR", "IN", "EQ", "NE", "GT", "LT", "GE", "LE", 
                      "TRUE", "FALSE", "STRING", "NUMBER", "LPAREN", "RPAREN", 
                      "COMMA", "WS" ]

    RULE_violationRule = 0
    RULE_condition = 1
    RULE_expression = 2
    RULE_comparator = 3
    RULE_value = 4
    RULE_stringList = 5
    RULE_numberList = 6

    ruleNames =  [ "violationRule", "condition", "expression", "comparator", 
                   "value", "stringList", "numberList" ]

    EOF = Token.EOF
    T__0=1
    T__1=2
    T__2=3
    T__3=4
    T__4=5
    T__5=6
    T__6=7
    T__7=8
    T__8=9
    BOOLEAN=10
    IF=11
    THEN=12
    AND=13
    OR=14
    IN=15
    EQ=16
    NE=17
    GT=18
    LT=19
    GE=20
    LE=21
    TRUE=22
    FALSE=23
    STRING=24
    NUMBER=25
    LPAREN=26
    RPAREN=27
    COMMA=28
    WS=29

    def __init__(self, input:TokenStream, output:TextIO = sys.stdout):
        super().__init__(input, output)
        self.checkVersion("4.9.2")
        self._interp = ParserATNSimulator(self, self.atn, self.decisionsToDFA, self.sharedContextCache)
        self._predicates = None




    class ViolationRuleContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def IF(self):
            return self.getToken(ViolationsParser.IF, 0)

        def condition(self):
            return self.getTypedRuleContext(ViolationsParser.ConditionContext,0)


        def THEN(self):
            return self.getToken(ViolationsParser.THEN, 0)

        def EOF(self):
            return self.getToken(ViolationsParser.EOF, 0)

        def getRuleIndex(self):
            return ViolationsParser.RULE_violationRule

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterViolationRule" ):
                listener.enterViolationRule(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitViolationRule" ):
                listener.exitViolationRule(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitViolationRule" ):
                return visitor.visitViolationRule(self)
            else:
                return visitor.visitChildren(self)




    def violationRule(self):

        localctx = ViolationsParser.ViolationRuleContext(self, self._ctx, self.state)
        self.enterRule(localctx, 0, self.RULE_violationRule)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 14
            self.match(ViolationsParser.IF)
            self.state = 15
            self.condition()
            self.state = 16
            self.match(ViolationsParser.THEN)
            self.state = 17
            self.match(ViolationsParser.T__0)
            self.state = 18
            self.match(ViolationsParser.EOF)
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

        def expression(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(ViolationsParser.ExpressionContext)
            else:
                return self.getTypedRuleContext(ViolationsParser.ExpressionContext,i)


        def AND(self, i:int=None):
            if i is None:
                return self.getTokens(ViolationsParser.AND)
            else:
                return self.getToken(ViolationsParser.AND, i)

        def OR(self, i:int=None):
            if i is None:
                return self.getTokens(ViolationsParser.OR)
            else:
                return self.getToken(ViolationsParser.OR, i)

        def getRuleIndex(self):
            return ViolationsParser.RULE_condition

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterCondition" ):
                listener.enterCondition(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitCondition" ):
                listener.exitCondition(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitCondition" ):
                return visitor.visitCondition(self)
            else:
                return visitor.visitChildren(self)




    def condition(self):

        localctx = ViolationsParser.ConditionContext(self, self._ctx, self.state)
        self.enterRule(localctx, 2, self.RULE_condition)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 20
            self.expression()
            self.state = 25
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while _la==ViolationsParser.AND or _la==ViolationsParser.OR:
                self.state = 21
                _la = self._input.LA(1)
                if not(_la==ViolationsParser.AND or _la==ViolationsParser.OR):
                    self._errHandler.recoverInline(self)
                else:
                    self._errHandler.reportMatch(self)
                    self.consume()
                self.state = 22
                self.expression()
                self.state = 27
                self._errHandler.sync(self)
                _la = self._input.LA(1)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ExpressionContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def comparator(self):
            return self.getTypedRuleContext(ViolationsParser.ComparatorContext,0)


        def value(self):
            return self.getTypedRuleContext(ViolationsParser.ValueContext,0)


        def STRING(self):
            return self.getToken(ViolationsParser.STRING, 0)

        def NUMBER(self):
            return self.getToken(ViolationsParser.NUMBER, 0)

        def LPAREN(self):
            return self.getToken(ViolationsParser.LPAREN, 0)

        def RPAREN(self):
            return self.getToken(ViolationsParser.RPAREN, 0)

        def BOOLEAN(self):
            return self.getToken(ViolationsParser.BOOLEAN, 0)

        def condition(self):
            return self.getTypedRuleContext(ViolationsParser.ConditionContext,0)


        def getRuleIndex(self):
            return ViolationsParser.RULE_expression

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterExpression" ):
                listener.enterExpression(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitExpression" ):
                listener.exitExpression(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitExpression" ):
                return visitor.visitExpression(self)
            else:
                return visitor.visitChildren(self)




    def expression(self):

        localctx = ViolationsParser.ExpressionContext(self, self._ctx, self.state)
        self.enterRule(localctx, 4, self.RULE_expression)
        try:
            self.state = 64
            self._errHandler.sync(self)
            token = self._input.LA(1)
            if token in [ViolationsParser.T__1]:
                self.enterOuterAlt(localctx, 1)
                self.state = 28
                self.match(ViolationsParser.T__1)
                self.state = 29
                self.comparator()
                self.state = 30
                self.value()
                pass
            elif token in [ViolationsParser.T__2]:
                self.enterOuterAlt(localctx, 2)
                self.state = 32
                self.match(ViolationsParser.T__2)
                self.state = 33
                self.comparator()
                self.state = 34
                self.match(ViolationsParser.STRING)
                pass
            elif token in [ViolationsParser.T__3]:
                self.enterOuterAlt(localctx, 3)
                self.state = 36
                self.match(ViolationsParser.T__3)
                self.state = 37
                self.comparator()
                self.state = 38
                self.match(ViolationsParser.NUMBER)
                pass
            elif token in [ViolationsParser.T__4]:
                self.enterOuterAlt(localctx, 4)
                self.state = 40
                self.match(ViolationsParser.T__4)
                self.state = 41
                self.comparator()
                self.state = 42
                self.match(ViolationsParser.NUMBER)
                pass
            elif token in [ViolationsParser.T__5]:
                self.enterOuterAlt(localctx, 5)
                self.state = 44
                self.match(ViolationsParser.T__5)
                self.state = 45
                self.match(ViolationsParser.LPAREN)
                self.state = 46
                self.match(ViolationsParser.STRING)
                self.state = 47
                self.match(ViolationsParser.RPAREN)
                self.state = 48
                self.comparator()
                self.state = 49
                self.match(ViolationsParser.NUMBER)
                self.state = 50
                self.match(ViolationsParser.T__6)
                pass
            elif token in [ViolationsParser.T__7]:
                self.enterOuterAlt(localctx, 6)
                self.state = 52
                self.match(ViolationsParser.T__7)
                self.state = 53
                self.comparator()
                self.state = 54
                self.match(ViolationsParser.BOOLEAN)
                pass
            elif token in [ViolationsParser.T__8]:
                self.enterOuterAlt(localctx, 7)
                self.state = 56
                self.match(ViolationsParser.T__8)
                self.state = 57
                self.comparator()
                self.state = 58
                self.match(ViolationsParser.STRING)
                pass
            elif token in [ViolationsParser.LPAREN]:
                self.enterOuterAlt(localctx, 8)
                self.state = 60
                self.match(ViolationsParser.LPAREN)
                self.state = 61
                self.condition()
                self.state = 62
                self.match(ViolationsParser.RPAREN)
                pass
            else:
                raise NoViableAltException(self)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ComparatorContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def EQ(self):
            return self.getToken(ViolationsParser.EQ, 0)

        def NE(self):
            return self.getToken(ViolationsParser.NE, 0)

        def GT(self):
            return self.getToken(ViolationsParser.GT, 0)

        def LT(self):
            return self.getToken(ViolationsParser.LT, 0)

        def GE(self):
            return self.getToken(ViolationsParser.GE, 0)

        def LE(self):
            return self.getToken(ViolationsParser.LE, 0)

        def IN(self):
            return self.getToken(ViolationsParser.IN, 0)

        def getRuleIndex(self):
            return ViolationsParser.RULE_comparator

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterComparator" ):
                listener.enterComparator(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitComparator" ):
                listener.exitComparator(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitComparator" ):
                return visitor.visitComparator(self)
            else:
                return visitor.visitChildren(self)




    def comparator(self):

        localctx = ViolationsParser.ComparatorContext(self, self._ctx, self.state)
        self.enterRule(localctx, 6, self.RULE_comparator)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 66
            _la = self._input.LA(1)
            if not((((_la) & ~0x3f) == 0 and ((1 << _la) & ((1 << ViolationsParser.IN) | (1 << ViolationsParser.EQ) | (1 << ViolationsParser.NE) | (1 << ViolationsParser.GT) | (1 << ViolationsParser.LT) | (1 << ViolationsParser.GE) | (1 << ViolationsParser.LE))) != 0)):
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


    class ValueContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def STRING(self):
            return self.getToken(ViolationsParser.STRING, 0)

        def NUMBER(self):
            return self.getToken(ViolationsParser.NUMBER, 0)

        def BOOLEAN(self):
            return self.getToken(ViolationsParser.BOOLEAN, 0)

        def stringList(self):
            return self.getTypedRuleContext(ViolationsParser.StringListContext,0)


        def numberList(self):
            return self.getTypedRuleContext(ViolationsParser.NumberListContext,0)


        def getRuleIndex(self):
            return ViolationsParser.RULE_value

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterValue" ):
                listener.enterValue(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitValue" ):
                listener.exitValue(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitValue" ):
                return visitor.visitValue(self)
            else:
                return visitor.visitChildren(self)




    def value(self):

        localctx = ViolationsParser.ValueContext(self, self._ctx, self.state)
        self.enterRule(localctx, 8, self.RULE_value)
        try:
            self.state = 73
            self._errHandler.sync(self)
            la_ = self._interp.adaptivePredict(self._input,2,self._ctx)
            if la_ == 1:
                self.enterOuterAlt(localctx, 1)
                self.state = 68
                self.match(ViolationsParser.STRING)
                pass

            elif la_ == 2:
                self.enterOuterAlt(localctx, 2)
                self.state = 69
                self.match(ViolationsParser.NUMBER)
                pass

            elif la_ == 3:
                self.enterOuterAlt(localctx, 3)
                self.state = 70
                self.match(ViolationsParser.BOOLEAN)
                pass

            elif la_ == 4:
                self.enterOuterAlt(localctx, 4)
                self.state = 71
                self.stringList()
                pass

            elif la_ == 5:
                self.enterOuterAlt(localctx, 5)
                self.state = 72
                self.numberList()
                pass


        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class StringListContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def LPAREN(self):
            return self.getToken(ViolationsParser.LPAREN, 0)

        def STRING(self, i:int=None):
            if i is None:
                return self.getTokens(ViolationsParser.STRING)
            else:
                return self.getToken(ViolationsParser.STRING, i)

        def RPAREN(self):
            return self.getToken(ViolationsParser.RPAREN, 0)

        def COMMA(self, i:int=None):
            if i is None:
                return self.getTokens(ViolationsParser.COMMA)
            else:
                return self.getToken(ViolationsParser.COMMA, i)

        def getRuleIndex(self):
            return ViolationsParser.RULE_stringList

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterStringList" ):
                listener.enterStringList(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitStringList" ):
                listener.exitStringList(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitStringList" ):
                return visitor.visitStringList(self)
            else:
                return visitor.visitChildren(self)




    def stringList(self):

        localctx = ViolationsParser.StringListContext(self, self._ctx, self.state)
        self.enterRule(localctx, 10, self.RULE_stringList)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 75
            self.match(ViolationsParser.LPAREN)
            self.state = 76
            self.match(ViolationsParser.STRING)
            self.state = 81
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while _la==ViolationsParser.COMMA:
                self.state = 77
                self.match(ViolationsParser.COMMA)
                self.state = 78
                self.match(ViolationsParser.STRING)
                self.state = 83
                self._errHandler.sync(self)
                _la = self._input.LA(1)

            self.state = 84
            self.match(ViolationsParser.RPAREN)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class NumberListContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def LPAREN(self):
            return self.getToken(ViolationsParser.LPAREN, 0)

        def NUMBER(self, i:int=None):
            if i is None:
                return self.getTokens(ViolationsParser.NUMBER)
            else:
                return self.getToken(ViolationsParser.NUMBER, i)

        def RPAREN(self):
            return self.getToken(ViolationsParser.RPAREN, 0)

        def COMMA(self, i:int=None):
            if i is None:
                return self.getTokens(ViolationsParser.COMMA)
            else:
                return self.getToken(ViolationsParser.COMMA, i)

        def getRuleIndex(self):
            return ViolationsParser.RULE_numberList

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterNumberList" ):
                listener.enterNumberList(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitNumberList" ):
                listener.exitNumberList(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitNumberList" ):
                return visitor.visitNumberList(self)
            else:
                return visitor.visitChildren(self)




    def numberList(self):

        localctx = ViolationsParser.NumberListContext(self, self._ctx, self.state)
        self.enterRule(localctx, 12, self.RULE_numberList)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 86
            self.match(ViolationsParser.LPAREN)
            self.state = 87
            self.match(ViolationsParser.NUMBER)
            self.state = 92
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while _la==ViolationsParser.COMMA:
                self.state = 88
                self.match(ViolationsParser.COMMA)
                self.state = 89
                self.match(ViolationsParser.NUMBER)
                self.state = 94
                self._errHandler.sync(self)
                _la = self._input.LA(1)

            self.state = 95
            self.match(ViolationsParser.RPAREN)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx





