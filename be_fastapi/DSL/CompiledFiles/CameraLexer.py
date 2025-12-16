# Generated from Camera.g4 by ANTLR 4.9.2
from antlr4 import *
from io import StringIO
import sys
if sys.version_info[1] > 5:
    from typing import TextIO
else:
    from typing.io import TextIO



def serializedATN():
    with StringIO() as buf:
        buf.write("\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\20")
        buf.write("X\b\1\4\2\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7")
        buf.write("\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t\13\4\f\t\f\4\r\t\r\4\16")
        buf.write("\t\16\4\17\t\17\3\2\3\2\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3")
        buf.write("\3\3\3\3\3\3\3\3\4\3\4\3\4\3\5\3\5\3\5\3\5\3\5\3\6\3\6")
        buf.write("\3\6\3\6\3\7\3\7\3\7\3\b\3\b\3\b\3\t\3\t\3\t\3\t\3\n\3")
        buf.write("\n\3\n\3\13\3\13\3\13\3\f\3\f\3\r\3\r\3\16\6\16N\n\16")
        buf.write("\r\16\16\16O\3\17\6\17S\n\17\r\17\16\17T\3\17\3\17\2\2")
        buf.write("\20\3\3\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25\f\27\r")
        buf.write("\31\16\33\17\35\20\3\2\4\5\2\62;C\\c|\5\2\13\f\17\17\"")
        buf.write("\"\2Y\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2")
        buf.write("\2\13\3\2\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2")
        buf.write("\23\3\2\2\2\2\25\3\2\2\2\2\27\3\2\2\2\2\31\3\2\2\2\2\33")
        buf.write("\3\2\2\2\2\35\3\2\2\2\3\37\3\2\2\2\5!\3\2\2\2\7,\3\2\2")
        buf.write("\2\t/\3\2\2\2\13\64\3\2\2\2\r8\3\2\2\2\17;\3\2\2\2\21")
        buf.write(">\3\2\2\2\23B\3\2\2\2\25E\3\2\2\2\27H\3\2\2\2\31J\3\2")
        buf.write("\2\2\33M\3\2\2\2\35R\3\2\2\2\37 \7\60\2\2 \4\3\2\2\2!")
        buf.write("\"\7V\2\2\"#\7G\2\2#$\7T\2\2$%\7O\2\2%&\7K\2\2&\'\7P\2")
        buf.write("\2\'(\7C\2\2()\7V\2\2)*\7G\2\2*+\7F\2\2+\6\3\2\2\2,-\7")
        buf.write("K\2\2-.\7H\2\2.\b\3\2\2\2/\60\7V\2\2\60\61\7J\2\2\61\62")
        buf.write("\7G\2\2\62\63\7P\2\2\63\n\3\2\2\2\64\65\7C\2\2\65\66\7")
        buf.write("P\2\2\66\67\7F\2\2\67\f\3\2\2\289\7Q\2\29:\7T\2\2:\16")
        buf.write("\3\2\2\2;<\7K\2\2<=\7U\2\2=\20\3\2\2\2>?\7H\2\2?@\7Q\2")
        buf.write("\2@A\7T\2\2A\22\3\2\2\2BC\7?\2\2CD\7?\2\2D\24\3\2\2\2")
        buf.write("EF\7#\2\2FG\7?\2\2G\26\3\2\2\2HI\7@\2\2I\30\3\2\2\2JK")
        buf.write("\7>\2\2K\32\3\2\2\2LN\t\2\2\2ML\3\2\2\2NO\3\2\2\2OM\3")
        buf.write("\2\2\2OP\3\2\2\2P\34\3\2\2\2QS\t\3\2\2RQ\3\2\2\2ST\3\2")
        buf.write("\2\2TR\3\2\2\2TU\3\2\2\2UV\3\2\2\2VW\b\17\2\2W\36\3\2")
        buf.write("\2\2\5\2OT\3\b\2\2")
        return buf.getvalue()


class CameraLexer(Lexer):

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    T__0 = 1
    T__1 = 2
    IF = 3
    THEN = 4
    AND = 5
    OR = 6
    IS = 7
    FOR = 8
    EQUAL = 9
    NOT_EQUAL = 10
    GREATER_THAN = 11
    LOWER_THAN = 12
    IDENTIFIER = 13
    WS = 14

    channelNames = [ u"DEFAULT_TOKEN_CHANNEL", u"HIDDEN" ]

    modeNames = [ "DEFAULT_MODE" ]

    literalNames = [ "<INVALID>",
            "'.'", "'TERMINATED'", "'IF'", "'THEN'", "'AND'", "'OR'", "'IS'", 
            "'FOR'", "'=='", "'!='", "'>'", "'<'" ]

    symbolicNames = [ "<INVALID>",
            "IF", "THEN", "AND", "OR", "IS", "FOR", "EQUAL", "NOT_EQUAL", 
            "GREATER_THAN", "LOWER_THAN", "IDENTIFIER", "WS" ]

    ruleNames = [ "T__0", "T__1", "IF", "THEN", "AND", "OR", "IS", "FOR", 
                  "EQUAL", "NOT_EQUAL", "GREATER_THAN", "LOWER_THAN", "IDENTIFIER", 
                  "WS" ]

    grammarFileName = "Camera.g4"

    def __init__(self, input=None, output:TextIO = sys.stdout):
        super().__init__(input, output)
        self.checkVersion("4.9.2")
        self._interp = LexerATNSimulator(self, self.atn, self.decisionsToDFA, PredictionContextCache())
        self._actions = None
        self._predicates = None


