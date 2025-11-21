# Generated from ./Camera.g4 by ANTLR 4.9.2
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
        buf.write("\t\16\4\17\t\17\3\2\3\2\3\2\3\2\3\3\3\3\3\3\3\3\3\3\5")
        buf.write("\3)\n\3\3\4\3\4\3\4\3\4\5\4/\n\4\3\5\6\5\62\n\5\r\5\16")
        buf.write("\5\63\3\6\3\6\3\6\3\7\3\7\3\7\3\7\3\7\3\b\3\b\3\b\3\b")
        buf.write("\3\t\3\t\3\t\3\t\3\n\3\n\3\n\3\n\3\13\3\13\3\13\3\13\3")
        buf.write("\13\3\f\3\f\3\r\3\r\3\16\3\16\3\16\3\17\3\17\3\17\2\2")
        buf.write("\20\3\3\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25\f\27\r")
        buf.write("\31\16\33\17\35\20\3\2\3\5\2\62;C\\c|\2\\\2\3\3\2\2\2")
        buf.write("\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2\2\2\2\r")
        buf.write("\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2\25\3")
        buf.write("\2\2\2\2\27\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2")
        buf.write("\2\2\3\37\3\2\2\2\5(\3\2\2\2\7.\3\2\2\2\t\61\3\2\2\2\13")
        buf.write("\65\3\2\2\2\r8\3\2\2\2\17=\3\2\2\2\21A\3\2\2\2\23E\3\2")
        buf.write("\2\2\25I\3\2\2\2\27N\3\2\2\2\31P\3\2\2\2\33R\3\2\2\2\35")
        buf.write("U\3\2\2\2\37 \7u\2\2 !\7\u01a3\2\2!\"\7p\2\2\"\4\3\2\2")
        buf.write("\2#$\5\t\5\2$%\7\60\2\2%&\5\t\5\2&)\3\2\2\2\')\5\t\5\2")
        buf.write("(#\3\2\2\2(\'\3\2\2\2)\6\3\2\2\2*/\5\33\16\2+/\5\35\17")
        buf.write("\2,/\5\27\f\2-/\5\31\r\2.*\3\2\2\2.+\3\2\2\2.,\3\2\2\2")
        buf.write(".-\3\2\2\2/\b\3\2\2\2\60\62\t\2\2\2\61\60\3\2\2\2\62\63")
        buf.write("\3\2\2\2\63\61\3\2\2\2\63\64\3\2\2\2\64\n\3\2\2\2\65\66")
        buf.write("\7K\2\2\66\67\7H\2\2\67\f\3\2\2\289\7V\2\29:\7J\2\2:;")
        buf.write("\7G\2\2;<\7P\2\2<\16\3\2\2\2=>\7C\2\2>?\7P\2\2?@\7F\2")
        buf.write("\2@\20\3\2\2\2AB\7Q\2\2BC\7T\2\2CD\7\"\2\2D\22\3\2\2\2")
        buf.write("EF\7K\2\2FG\7U\2\2GH\7\"\2\2H\24\3\2\2\2IJ\7H\2\2JK\7")
        buf.write("Q\2\2KL\7T\2\2LM\7\"\2\2M\26\3\2\2\2NO\7@\2\2O\30\3\2")
        buf.write("\2\2PQ\7>\2\2Q\32\3\2\2\2RS\7?\2\2ST\7?\2\2T\34\3\2\2")
        buf.write("\2UV\7#\2\2VW\7?\2\2W\36\3\2\2\2\6\2(.\63\2")
        return buf.getvalue()


class CameraLexer(Lexer):

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    T__0 = 1
    OBJECT = 2
    OPERATION = 3
    IDENTIFIER = 4
    IF = 5
    THEN = 6
    AND = 7
    OR = 8
    IS = 9
    FOR = 10
    GREATER_THAN = 11
    LOWER_THAN = 12
    EQUAL = 13
    NOT_EQUAL = 14

    channelNames = [ u"DEFAULT_TOKEN_CHANNEL", u"HIDDEN" ]

    modeNames = [ "DEFAULT_MODE" ]

    literalNames = [ "<INVALID>",
            "'s\u01A1n'", "'IF'", "'THEN'", "'AND'", "'OR '", "'IS '", "'FOR '", 
            "'>'", "'<'", "'=='", "'!='" ]

    symbolicNames = [ "<INVALID>",
            "OBJECT", "OPERATION", "IDENTIFIER", "IF", "THEN", "AND", "OR", 
            "IS", "FOR", "GREATER_THAN", "LOWER_THAN", "EQUAL", "NOT_EQUAL" ]

    ruleNames = [ "T__0", "OBJECT", "OPERATION", "IDENTIFIER", "IF", "THEN", 
                  "AND", "OR", "IS", "FOR", "GREATER_THAN", "LOWER_THAN", 
                  "EQUAL", "NOT_EQUAL" ]

    grammarFileName = "Camera.g4"

    def __init__(self, input=None, output:TextIO = sys.stdout):
        super().__init__(input, output)
        self.checkVersion("4.9.2")
        self._interp = LexerATNSimulator(self, self.atn, self.decisionsToDFA, PredictionContextCache())
        self._actions = None
        self._predicates = None


