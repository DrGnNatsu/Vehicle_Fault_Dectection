import AfterNavigation from "@/components/AfterNavigation";
import BeforeNavigation from "@/components/BeforeNavigation";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/authStore";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dslGrammar, ruleRecipes } from "@/data/dslDocumentation";
import { BookOpen, Code, List, Terminal } from "lucide-react";

export default function DocumentationPage() {
    const { isAuthenticated } = useAuthStore();

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    
    return (
         <div className="min-h-screen flex flex-col bg-background">
            {isAuthenticated ? <AfterNavigation /> : <BeforeNavigation />}
            
            <main className="flex-1 container mx-auto py-8 px-4 flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="sticky top-24 space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-primary" />
                                Reference
                            </h3>
                            <nav className="flex flex-col space-y-1 text-sm">
                                <button onClick={() => scrollToSection('grammar')} className="text-left px-3 py-2 rounded-md hover:bg-muted font-medium transition-colors">
                                    Grammar & Syntax
                                </button>
                                <button onClick={() => scrollToSection('fields')} className="text-left px-3 py-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                                    Available Fields
                                </button>
                            </nav>
                        </div>
                        
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <List className="w-5 h-5 text-primary" />
                                Recipes
                            </h3>
                            <nav className="flex flex-col space-y-1 text-sm">
                                {ruleRecipes.map((recipe, idx) => (
                                    <button 
                                        key={idx} 
                                        onClick={() => scrollToSection(`recipe-${idx}`)} 
                                        className="text-left px-3 py-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground truncate transition-colors"
                                    >
                                        {recipe.title}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 space-y-10 min-w-0">
                    
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Rule Detection DSL</h1>
                        <p className="text-muted-foreground text-lg">
                            Complete guide to writing detection logic for the Violations system.
                        </p>
                    </div>

                    {/* Part 1: Grammar */}
                    <section id="grammar" className="space-y-6 scroll-mt-24">
                        <div className="flex items-center gap-3 pb-2 border-b">
                            <Terminal className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-bold">Grammar Reference</h2>
                        </div>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Structure</CardTitle>
                                <CardDescription>Each rule must follow this exact syntax pattern.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-muted p-4 rounded-md font-mono text-sm border shadow-sm">
                                    {dslGrammar.structure}
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {dslGrammar.keywords.map(kw => (
                                        <Badge key={kw} variant="outline" className="font-mono">{kw}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader><CardTitle className="text-base">Comparators</CardTitle></CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Operator</TableHead>
                                                <TableHead>Description</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {dslGrammar.comparators.map(c => (
                                                <TableRow key={c.op}>
                                                    <TableCell className="font-mono text-primary">{c.op}</TableCell>
                                                    <TableCell>{c.desc}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* Fields Reference */}
                    <section id="fields" className="space-y-4 scroll-mt-24">
                         <h3 className="text-xl font-semibold">Available Fields</h3>
                         <div className="border rounded-xl overflow-hidden shadow-sm bg-card">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead>Field Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={3} className="bg-muted/20 font-semibold text-xs py-1">Object Scope (object.*)</TableCell>
                                    </TableRow>
                                    {dslGrammar.fieldsObject.map(f => (
                                        <TableRow key={f.field}>
                                            <TableCell className="font-mono text-sm font-medium">{f.field}</TableCell>
                                            <TableCell><Badge variant="secondary" className="text-[10px]">{f.type}</Badge></TableCell>
                                            <TableCell className="text-muted-foreground text-sm">{f.desc}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell colSpan={3} className="bg-muted/20 font-semibold text-xs py-1">Scene Scope (scene.*)</TableCell>
                                    </TableRow>
                                    {dslGrammar.fieldsScene.map(f => (
                                        <TableRow key={f.field}>
                                            <TableCell className="font-mono text-sm font-medium">{f.field}</TableCell>
                                            <TableCell><Badge variant="secondary" className="text-[10px]">{f.type}</Badge></TableCell>
                                            <TableCell className="text-muted-foreground text-sm">{f.desc}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                         </div>
                    </section>

                    {/* Part 2: Recipes */}
                    <section id="recipes" className="space-y-8 scroll-mt-24">
                        <div className="flex items-center gap-3 pb-2 border-b">
                            <Code className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-bold">Common Recipes</h2>
                        </div>
                        <p className="text-muted-foreground">Copy and paste these templates to quickly set up common violation detection rules.</p>
                        
                        <div className="grid gap-6">
                            {ruleRecipes.map((recipe, idx) => (
                                <Card key={idx} id={`recipe-${idx}`} className="scroll-mt-32 overflow-hidden border-l-4 border-l-primary/50">
                                    <CardHeader className="bg-muted/10 pb-3">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                            <CardTitle className="text-lg">{recipe.title}</CardTitle>
                                            {recipe.vnTitle && <Badge variant="outline" className="w-fit">{recipe.vnTitle}</Badge>}
                                        </div>
                                        <CardDescription className="mt-2 text-base">
                                            {recipe.logic}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-4 bg-zinc-950 text-zinc-50 dark:bg-zinc-900 border-t">
                                        <pre className="font-mono text-sm overflow-x-auto p-2">
                                            <code>{recipe.code}</code>
                                        </pre>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                </div>
            </main>
            <Footer />
        </div>
    );
}