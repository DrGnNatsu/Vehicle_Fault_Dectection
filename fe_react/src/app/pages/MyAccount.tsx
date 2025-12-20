import React, {useState} from "react";
import AfterNavigation from "@/components/AfterNavigation";
import Footer from "@/components/Footer";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/utils/utils";
import '../css/MyAccount.css';

export default function AccountSetting() {
    // 1. State for toggling Edit Mode
    const [isEditing, setIsEditing] = useState(false);

    // 2. State for Form Data
    const [formData, setFormData] = useState({
        fullName: "John Doe",
        email: "johndoe@example.com",
        role: "Administrator",
        licensePlate: "ABC-1234",
        status: "Active",
        createdAt: "2023-10-15",
        updatedAt: "2025-12-20",
    });

    /**
     * FUTURE API FETCH:
     * Add a useEffect hook here to fetch user data on component mount.
     * Example:
     * useEffect(() => {
     *   const fetchUserData = async () => {
     *     const response = await api.get('/user/profile');
     *     setFormData(response.data);
     *   };
     *   fetchUserData();
     * }, []);
     */

        // Handle Input Changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            setFormData((prev) => ({...prev, [name]: value}));
        };

    // Toggle Edit Mode
    const handleEditAccount = () => {
        setIsEditing(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        /**
         * FUTURE API UPDATE:
         * Replace this console log with an actual API call to update user profile.
         * Example:
         * try {
         *   await api.put('/user/profile', formData);
         *   toast.success("Profile updated successfully!");
         * } catch (err) {
         *   toast.error("Failed to update profile.");
         * }
         */
        console.log("[v0] Saving Data:", formData);
        setIsEditing(false); // Switch back to View mode
    };

    const handleCancel = () => {
        setIsEditing(false); // Revert to View mode without saving
        // Optionally reset formData here by re-fetching or keeping a backup
    };

    const handleDeleteAccount = () => {
        /**
         * FUTURE API DELETE:
         * Add API call to delete or deactivate account.
         */
        console.log("[v0] Delete Account");
    };

    return (
        <div className="myAccountContainer">
            <AfterNavigation />

            <main className="myAccountMain">
                {/* --- Main Content: Centered Card --- */}
                <div className="accountCard">
                    {/* Header */}
                    <div className="accountHeader">
                        <div className="headerInfo">
                            <h1 className="accountTitle">Account Settings</h1>
                            <p className="accountSubtitle">Manage your profile information and account security.</p>
                        </div>
                        <div className="headerStatus">
                            <Badge variant="outline" className={cn(
                                "statusBadge",
                                formData.status.toLowerCase() === 'active' ? 'status-active' : 'status-inactive'
                            )}>
                                {formData.status}
                            </Badge>
                        </div>
                    </div>

                    <form onSubmit={handleSave} className="accountForm">
                        <div className="formGrid">
                            {/* Field: Full Name */}
                            <div className="fieldGroup">
                                <Label className="fieldLabel">Full Name</Label>
                                {isEditing ? (
                                    <Input
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="fieldInput"
                                    />
                                ) : (
                                    <div className="fieldDisplay">
                                        {formData.fullName}
                                    </div>
                                )}
                            </div>

                            {/* Field: Email */}
                            <div className="fieldGroup">
                                <Label className="fieldLabel">Email Address</Label>
                                {isEditing ? (
                                    <Input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="fieldInput"
                                    />
                                ) : (
                                    <div className="fieldDisplay">
                                        {formData.email}
                                    </div>
                                )}
                            </div>

                            {/* Field: License Plate */}
                            <div className="fieldGroup">
                                <Label className="fieldLabel">License Plate</Label>
                                {isEditing ? (
                                    <Input
                                        name="licensePlate"
                                        value={formData.licensePlate}
                                        onChange={handleInputChange}
                                        className="fieldInput"
                                    />
                                ) : (
                                    <div className="fieldDisplay">
                                        {formData.licensePlate}
                                    </div>
                                )}
                            </div>

                            {/* Field: Role */}
                            <div className="fieldGroup">
                                <Label className="fieldLabel">Account Role</Label>
                                <div className="fieldDisplay bg-muted/50">
                                    {formData.role}
                                </div>
                            </div>
                        </div>

                        <div className="dateGrid">
                            {/* Field: Created Date */}
                            <div className="dateItem">
                                <Label className="fieldLabel">Account Created</Label>
                                <div className="dateValue">
                                    {formData.createdAt}
                                </div>
                            </div>

                            {/* Field: Last Updated */}
                            <div className="dateItem">
                                <Label className="fieldLabel">Last Updated</Label>
                                <div className="dateValue">
                                    {formData.updatedAt}
                                </div>
                            </div>
                        </div>

                        {/* Footer Section */}
                        <div className="formFooter">
                            <div className="footerLeft">
                                {!isEditing && (
                                    <div className="passwordSection">
                                        <Button type="button" className="changePasswordButton">
                                            Change Password
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <div className="footerRight">
                                {isEditing ? (
                                    <div className="actionButtons">
                                        <Button type="button" variant="outline" className="cancelButton"
                                                onClick={handleCancel}>
                                            Cancel
                                        </Button>
                                        <Button type="submit"
                                                className="saveButton bg-green-600 hover:bg-green-700 text-white">
                                            Save Changes
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="viewActions">
                                        <Button type="button" onClick={handleEditAccount} className="editButton bg-primary hover:bg-primary/90">
                                            Edit Profile
                                        </Button>
                                        <Button type="button" onClick={handleDeleteAccount} variant="destructive" className="deleteButton">
                                            Delete Account
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}