grammar Camera;

// --- PARSER RULES ---

program: command EOF;

command: IF condition THEN expr;

// Logical system
condition: orCondition;

orCondition: andCondition (OR andCondition)*;

andCondition: compare (AND compare)*;

//ANTLR will match the shorter one therefore : if car.speed == 4 THEN blah blaj => antlr chose
// car.speed as it is obj rewrite to prioritized obj clause: obj OPERATION obj | obj; clause:
// compare | obj;
compare: obj operations obj;
obj: IDENTIFIER ('.' IDENTIFIER)?;
operations: EQUAL | NOT_EQUAL | GREATER_THAN | LOWER_THAN;
expr: 'TERMINATED';

// --- LEXER RULES ---

IF: 'IF';
THEN: 'THEN';
AND: 'AND';
OR: 'OR';
IS: 'IS';
FOR: 'FOR';

// Operators
EQUAL: '==';
NOT_EQUAL: '!=';
GREATER_THAN: '>';
LOWER_THAN: '<';

IDENTIFIER: [a-zA-Z0-9]+;

WS: [ \t\r\n]+ -> skip;