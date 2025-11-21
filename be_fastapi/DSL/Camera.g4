grammar Camera;

program: (command EOF);
command: IF condition THEN expr;
condition: (clause (AND | OR) | clause)+;
clause: OBJECT (OPERATION) OBJECT | OBJECT;
expr: 'sơn';

// Non Terminals Symbols

// Terminals Symbol
OBJECT: IDENTIFIER '.' IDENTIFIER | IDENTIFIER;
OPERATION: (EQUAL | NOT_EQUAL | GREATER_THAN | LOWER_THAN);
// 
IDENTIFIER: [a-zA-Z0-9]+; // "car09" possible? fuck it can!

//keyword
IF: 'IF';
THEN: 'THEN';
AND: 'AND';
OR: 'OR ';
IS: 'IS ';
FOR: 'FOR ';

// Operators
GREATER_THAN: '>';
LOWER_THAN: '<';
EQUAL: '==';
NOT_EQUAL: '!=';

//