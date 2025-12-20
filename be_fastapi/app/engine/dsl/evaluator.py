from antlr4 import InputStream, CommonTokenStream
from CompiledFiles.ViolationsLexer import ViolationsLexer
from CompiledFiles.ViolationsParser import ViolationsParser
from CompiledFiles.ViolationsVisitor import ViolationsVisitor
from shapely.geometry import Point, Polygon
from typing import Dict, Any, List

class DSLEvaluator(ViolationsVisitor):
    def __init__(self, object_data: Dict[str, Any], zones: Dict[str, Polygon], scene_data: Dict[str, Any] = None):
        super().__init__()
        self.object_data = object_data or {}
        self.zones = zones or {}
        self.scene_data = scene_data or {}

    def evaluate(self, dsl_text: str) -> bool:
        if not dsl_text.strip():
            return False
        
        input_stream = InputStream(dsl_text)
        lexer = ViolationsLexer(input_stream)
        stream = CommonTokenStream(lexer)
        parser = ViolationsParser(stream)
        tree = parser.violationRule()
        
        if parser.getNumberOfSyntaxErrors() > 0:
            raise ValueError(f"DSL syntax error in: {dsl_text}")
        
        return self.visit(tree)

    def visitViolationRule(self, ctx):
        return self.visit(ctx.condition())

    def visitCondition(self, ctx):
        results = [self.visit(expr) for expr in ctx.expression()]
        children = list(ctx.getChildren())
        ops = [children[i].getText().upper() for i in range(1, len(children), 2) if children[i].getText() in ('AND', 'OR')]
        
        result = results[0]
        for i, op in enumerate(ops):
            right = results[i + 1]
            if op == 'AND':
                result = result and right
            elif op == 'OR':
                result = result or right
        return result

    def visitExpression(self, ctx):
        children = ctx.getChildren()
        child_list = list(children)
        
        first_text = child_list[0].getText()
        
        if first_text == 'object.class_name':
            left = self.object_data.get('class_name', '')
            op = ctx.comparator().getText()
            right = self.parse_value(ctx.value())
            return self.compare(left, op, right)
        
        elif first_text == 'object.current_zone':
            left = self.object_data.get('current_zone', '')
            op = ctx.comparator().getText()
            right = ctx.STRING().getText().strip('"')
            return self.compare(left, op, right)
        
        elif first_text == 'object.speed_kmh':
            left = self.object_data.get('speed_kmh', 0.0)
            op = ctx.comparator().getText()
            right = float(ctx.NUMBER().getText())
            return self.compare(left, op, right)
        
        elif first_text == 'object.direction_angle':
            left = self.object_data.get('direction_angle', 0.0)
            op = ctx.comparator().getText()
            right = float(ctx.NUMBER().getText())
            return self.compare(left, op, right)
        
        elif first_text == 'object.zone_duration_seconds':
            zone_name = ctx.STRING().getText().strip('"')
            duration = self.object_data.get('zone_duration_seconds', {}).get(zone_name, 0.0)
            op = ctx.comparator().getText()
            seconds = float(ctx.NUMBER().getText())
            return self.compare(duration, op, seconds)
        
        elif first_text == 'object.attributes.has_helmet':
            has_helmet = self.object_data.get('attributes', {}).get('has_helmet', None)
            expected = child_list[2].getText() == 'true'
            return has_helmet == expected
        
        elif first_text == 'scene.traffic_light_color':
            left = self.scene_data.get('traffic_light_color', '')
            op = ctx.comparator().getText()
            right = ctx.STRING().getText().strip('"')
            return self.compare(left, op, right)
        
        elif ctx.LPAREN():  # nested condition
            return self.visit(ctx.condition())
        
        return False

    # Helper methods
    def compare(self, left: Any, op: str, right: Any) -> bool:
        if op == '==': return left == right
        if op == '!=': return left != right
        if op == '>': return left > right
        if op == '<': return left < right
        if op == '>=': return left >= right
        if op == '<=': return left <= right
        if op == 'IN':
            return left in right if isinstance(right, list) else False
        return False

    def parse_value(self, value_ctx):
        if value_ctx.STRING():
            return value_ctx.STRING().getText().strip('"')
        if value_ctx.NUMBER():
            return float(value_ctx.NUMBER().getText())
        if value_ctx.BOOLEAN():
            return value_ctx.BOOLEAN().getText() == 'true'
        if value_ctx.stringList():
            # Parse string list from parser rule
            strings = value_ctx.stringList().STRING()
            return [s.getText().strip('"') for s in strings]
        if value_ctx.numberList():
            # Parse number list from parser rule
            numbers = value_ctx.numberList().NUMBER()
            return [float(n.getText()) for n in numbers]
        return None