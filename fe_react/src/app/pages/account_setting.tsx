import React, { useState } from "react";
import AfterNavigation from "@/components/AfterNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AccountSetting() {
    // 1. State for toggling Edit Mode
    const [isEditing, setIsEditing] = useState(false);

    // 2. State for Form Data
    const [formData, setFormData] = useState({
        username: "John Doe",
        dob: "2000-01-01",
        email: "johndoe@example.com",
    });

    // Handle Input Changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Toggle Edit Mode
    const handleEditAccount = () => {
        setIsEditing(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("[v0] Saving Data:", formData);
        setIsEditing(false); // Switch back to View mode
    };

    const handleCancel = () => {
        setIsEditing(false); // Revert to View mode without saving
        // Optionally reset formData here if needed
    };

    const handleDeleteAccount = () => {
        console.log("[v0] Delete Account");
    };

    // Shared style for both Input and Read-only View to ensure they look identical
    // h-auto allows the padding to determine the height, fixing the "invisible text" issue
    const fieldStyles = "w-full max-w-md !px-4 !py-4 text-base h-auto bg-gray-400 dark:bg-gray-500 text-gray-900 dark:text-gray-50";

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
            <AfterNavigation />
            
            <main className="flex-1 w-full mx-auto !p-4 flex flex-col md:flex-row items-start gap-8">
                
                {/* --- Left Section: Profile Card --- */}
                <div className="w-full md:w-80 flex-shrink-0 !p-6 rounded-2xl border border-border bg-card shadow-sm flex flex-col items-center gap-6">
                    <div className="w-48 h-48 relative">
                        <img 
                            className="w-full h-full rounded-full object-cover border-4 border-muted" 
                            src="https://placehold.co/192x192" 
                            alt="User Profile"
                        />
                    </div>
                    
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h2 className="text-xl font-bold text-foreground">{formData.username}</h2>
                        <p className="text-muted-foreground font-medium">{formData.email}</p>
                    </div>

                    <div className="flex flex-col w-full gap-3 !mt-2">
                        {/* Hide main 'Edit' button if already editing */}
                        {!isEditing && (
                            <Button onClick={handleEditAccount} className="w-full bg-blue-600 hover:bg-blue-700">
                                Edit Account
                            </Button>
                        )}
                        
                        <Button onClick={handleDeleteAccount} variant="destructive" className="w-full">
                            Delete Account
                        </Button>
                    </div>
                </div>

                {/* --- Right Section: The Form --- */}
                <div className="flex-1 w-full rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="h-16 !px-6 flex items-center border-b border-border bg-muted/20">
                        <h1 className="text-2xl font-bold text-blue-600 dark:text-sky-400">My Account</h1>
                    </div>

                    <form onSubmit={handleSave}>
                        {/* Field 1: Username */}
                        <div className="!p-6 border-b border-border flex flex-col gap-4">
                            <Label className="text-lg font-bold text-foreground">Username</Label>
                            {isEditing ? (
                                <Input 
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className={fieldStyles} // Using shared styles + h-auto
                                />
                            ) : (
                                <div className={`${fieldStyles} bg-muted/30 rounded-lg border border-border font-medium text-foreground flex items-center`}>
                                    {formData.username}
                                </div>
                            )}
                        </div>

                        {/* Field 2: Date of Birth */}
                        <div className="!p-6 border-b border-border flex flex-col gap-4">
                            <Label className="text-lg font-bold text-foreground">Date of Birth</Label>
                            {isEditing ? (
                                <Input 
                                    name="dob"
                                    type="date"
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                    className={fieldStyles}
                                />
                            ) : (
                                <div className={`${fieldStyles} bg-muted/30 rounded-lg border border-border font-medium text-foreground flex items-center`}>
                                    {formData.dob}
                                </div>
                            )}
                        </div>

                        {/* Field 3: Email */}
                        <div className="!p-6 border-b border-border flex flex-col gap-4">
                            <Label className="text-lg font-bold text-foreground">Email</Label>
                            {isEditing ? (
                                <Input 
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={fieldStyles}
                                />
                            ) : (
                                <div className={`${fieldStyles} bg-muted/30 rounded-lg border border-border font-medium text-foreground flex items-center`}>
                                    {formData.email}
                                </div>
                            )}
                        </div>

                        {/* Footer / Password Section */}
                        <div className="!p-6 bg-muted/10 flex flex-col sm:flex-row items-center justify-start gap-6">
                            {isEditing ? (
                                /* Save / Cancel Buttons when Editing */
                                <div className="flex gap-4 w-full justify-end">
                                    <Button type="button" variant="outline" className="bg-red-600 hover:bg-red-700 !p-4 text-white" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-green-600 hover:bg-green-700 !p-4 text-white">
                                        Save Changes
                                    </Button>
                                </div>
                            ) : (
                                /* Change Password Layout - Label next to Button */
                                <>
                                    <h3 className="text-lg font-bold text-foreground min-w-fit">Password</h3>
                                    <Button variant="destructive" className="bg-red-600 hover:bg-red-700 !p-4 h-auto">
                                        Change your Password
                                    </Button>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}