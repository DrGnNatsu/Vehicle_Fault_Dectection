import { useEffect, useState } from "react";
import { Plus, Trash2, RefreshCcw, AlertCircle, FileText } from "lucide-react";
import AfterNavigation from "@/components/AfterNavigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ruleService } from "@/services/ruleService";
import type { Rule, CreateRulePayload } from "@/types/rule";
import { cn } from "@/utils/utils";

export default function RulesPage() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [expandedRules, setExpandedRules] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newRule, setNewRule] = useState<CreateRulePayload>({
    name: "",
    dsl_content: "",
  });

  const loadRules = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ruleService.fetchRules();
      setRules(data);
    } catch (err: any) {
      console.error("Failed to fetch rules:", err);
      setError("Failed to load rules. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRules();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedRules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const created = await ruleService.createRule(newRule);
      setRules((prev) => [created, ...prev]);
      setIsCreateModalOpen(false);
      setNewRule({ name: "", dsl_content: "" });
    } catch (err: any) {
      console.error("Failed to create rule:", err);
      alert("Failed to create rule. Please check your DSL syntax.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRule = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this rule?")) return;
    try {
      await ruleService.deleteRule(id);
      setRules((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      console.error("Failed to delete rule:", err);
      alert("Failed to delete rule.");
    }
  };

  const handleToggleStatus = async (rule: Rule) => {
    try {
      const updated = await ruleService.updateRule(rule.id, { is_active: !rule.is_active });
      setRules((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    } catch (err: any) {
      console.error("Failed to toggle rule status:", err);
      alert("Failed to update status.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AfterNavigation />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rules Management</h1>
            <p className="text-muted-foreground mt-1">Configure DSL rules for violation detection</p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="icon" onClick={loadRules} disabled={isLoading}>
              <RefreshCcw className={cn("w-4 h-4", isLoading && "animate-spin")} />
            </Button>
            
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Rule
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <form onSubmit={handleCreateRule}>
                  <DialogHeader>
                    <DialogTitle>Create Detection Rule</DialogTitle>
                    <DialogDescription>
                      Define the logic for detecting violations using the Domain Specific Language (DSL).
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-6 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Rule Name</Label>
                      <Input
                        id="name"
                        required
                        placeholder="e.g., Wrong Way Detection"
                        value={newRule.name}
                        onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dsl">DSL Logic</Label>
                      <Textarea
                        id="dsl"
                        required
                        className="min-h-[200px] font-mono text-xs"
                        placeholder="IF vehicle.direction != lane.direction THEN violation(type='wrong_way')"
                        value={newRule.dsl_content}
                        onChange={(e) => setNewRule({ ...newRule, dsl_content: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Creating..." : "Save Rule"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <RefreshCcw className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading your rules...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-destructive border rounded-xl bg-destructive/5">
            <AlertCircle className="w-10 h-10" />
            <p className="font-semibold text-lg">{error}</p>
            <Button variant="outline" onClick={loadRules}>Try Again</Button>
          </div>
        ) : (
          <div className="border rounded-xl bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>DSL Preview</TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                  <TableHead className="w-[180px]">Created At</TableHead>
                  <TableHead className="text-right w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-40 text-center text-muted-foreground">
                      No rules found. Start by creating a new detection logic.
                    </TableCell>
                  </TableRow>
                ) : (
                  rules.map((rule) => (
                    <TableRow key={rule.id} className="group">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary/70" />
                          {rule.name}
                        </div>
                      </TableCell>
                      <TableCell className="align-top">
                        <code 
                          onClick={() => toggleExpand(rule.id)}
                          className={cn(
                            "text-xs bg-muted px-1.5 py-1 rounded text-muted-foreground block border border-transparent hover:border-border transition-all cursor-pointer",
                            expandedRules.has(rule.id) ? "whitespace-pre-wrap break-all pr-4" : "truncate max-w-[200px]"
                          )}
                          title={!expandedRules.has(rule.id) ? "Click to expand" : "Click to collapse"}
                        >
                          {rule.dsl_content}
                        </code>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={rule.is_active} 
                            onCheckedChange={() => handleToggleStatus(rule)}
                          />
                          {rule.is_active ? (
                            <span className="text-[10px] uppercase font-bold text-green-500">Active</span>
                          ) : (
                            <span className="text-[10px] uppercase font-bold text-muted-foreground">Inactive</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {new Date(rule.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteRule(rule.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
}
