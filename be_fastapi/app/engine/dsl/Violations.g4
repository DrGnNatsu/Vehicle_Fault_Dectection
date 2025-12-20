grammar Violations;

violationRule: IF condition THEN 'TRIGGER_VIOLATION' EOF;

condition: expression ( ( AND | OR) expression)*;

expression:
	'object.class_name' comparator value
	| 'object.current_zone' comparator STRING
	| 'object.speed_kmh' comparator NUMBER
	| 'object.direction_angle' comparator NUMBER
	| 'object.zone_duration_seconds' LPAREN STRING RPAREN comparator NUMBER 'SECONDS'
	| 'object.attributes.has_helmet' comparator BOOLEAN
	| 'scene.traffic_light_color' comparator STRING
	| LPAREN condition RPAREN;

comparator: EQ | NE | GT | LT | GE | LE | IN;

value: STRING | NUMBER | BOOLEAN | stringList | numberList;

stringList: LPAREN STRING ( COMMA STRING)* RPAREN;
numberList: LPAREN NUMBER ( COMMA NUMBER)* RPAREN;

BOOLEAN: TRUE | FALSE;

IF: 'IF';
THEN: 'THEN';
AND: 'AND';
OR: 'OR';
IN: 'IN';
EQ: '==';
NE: '!=';
GT: '>';
LT: '<';
GE: '>=';
LE: '<=';
TRUE: 'true';
FALSE: 'false';

STRING: '"' ~["]* '"';
NUMBER: [0-9]+ ( '.' [0-9]+)?;

LPAREN: '(';
RPAREN: ')';
COMMA: ',';

WS: [ \t\r\n]+ -> skip;