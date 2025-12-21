import { useEffect, useState } from "react";
import AfterNavigation from "@/components/AfterNavigation";
import Footer from "@/components/Footer";
import { userService } from "@/services/userService";
import type { User, CreateUserRequest, UpdateUserRequest } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Trash2, UserPlus, Shield, User as UserIcon, Loader2, Edit2, X, Check, Siren } from "lucide-react";
import '@/app/css/Home.css'; // Reusing some base styles

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' as 'police' | 'user' | 'Admin',
    full_name: '',
    license_plate: '',
    is_active: true
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const data = await userService.listUsers();
      setUsers(data);
    } catch (err: any) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setModalMode('create');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user',
      full_name: '',
      license_plate: '',
      is_active: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setModalMode('edit');
    setEditingUserId(user.id);
    setFormData({
      email: user.email,
      password: '', // Password not editable this way
      confirmPassword: '',
      role: user.role as any,
      full_name: user.full_name || '',
      license_plate: user.license_plate || '',
      is_active: user.is_active
    });
    setIsModalOpen(true);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      if (modalMode === 'create') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        const newUserData: CreateUserRequest = {
          email: formData.email,
          password: formData.password,
          role: formData.role.toLowerCase(), 
          full_name: formData.full_name || null,
          license_plate: formData.license_plate || null
        };
        await userService.createUser(newUserData);
      } else if (editingUserId) {
        const updateData: UpdateUserRequest = {
          full_name: formData.full_name || null,
          role: formData.role.toLowerCase(),
          license_plate: formData.license_plate || null,
          is_active: formData.is_active
        };
        await userService.updateUser(editingUserId, updateData);
      }
      
      await fetchUsers();
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Save failed:", err);
      setError(err.message || "Failed to save user information.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user? (Soft delete)")) return;
    try {
      await userService.deleteUser(userId);
      // Update local state (soft delete sets isActive to false, but if we want to remove from list or just mark)
      setUsers(users.map(u => u.id === userId ? { ...u, is_active: false } : u));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="homeContainer">
      <AfterNavigation />

      <main className="homeMain max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground mt-1">Manage all registered users and their roles.</p>
          </div>
          <Button onClick={handleOpenCreate} className="gap-2">
            <UserPlus className="w-4 h-4" />
            Add New User
          </Button>
        </div>

        {error && !isModalOpen && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              A total of {users.length} users found in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Fetching users...</p>
              </div>
            ) : (
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-base">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">License Plate</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined</th>
                      <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0 text-foreground">
                    {users.map((user) => (
                      <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted group">
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                              <UserIcon className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium group-hover:text-primary transition-colors">{user.full_name || "N/A"}</span>
                              <span className="text-xs text-muted-foreground">{user.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge variant="outline" className="gap-1.5 font-medium capitalize px-2.5 py-1 text-sm">
                            {user.role?.toLowerCase() === 'admin' && <Shield className="w-4 h-4 text-red-500" />}
                            {user.role?.toLowerCase() === 'police' && <Siren className="w-4 h-4 text-blue-500" />}
                            {(user.role?.toLowerCase() === 'user' || !user.role) && <UserIcon className="w-4 h-4 text-sky-500" />}
                            {user.role}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle font-mono font-medium">
                          {user.license_plate || <span className="text-muted-foreground/50">None</span>}
                        </td>
                        <td className="p-4 align-middle">
                          <Badge variant={user.is_active ? "default" : "secondary"} className="font-semibold px-2.5">
                            {user.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle text-muted-foreground">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex justify-center gap-1.5">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-primary hover:bg-primary/10 h-9 w-9"
                              onClick={() => handleOpenEdit(user)}
                            >
                              <Edit2 className="w-4.5 h-4.5" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive hover:bg-destructive/10 h-9 w-9"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-muted-foreground">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Modal Backdrop and Content */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>{modalMode === 'create' ? 'Add New User' : 'Edit User'}</CardTitle>
                <CardDescription>
                  {modalMode === 'create' ? 'Enter details to create a new system user.' : 'Modify existing user information.'}
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveUser} className="space-y-4">
                {error && (
                  <div className="bg-destructive/10 text-destructive p-3 rounded text-xs">
                    {error}
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name" className="flex justify-between">
                      Full Name
                      <span className="text-muted-foreground font-normal text-[0.7rem] uppercase tracking-wider">Optional</span>
                    </Label>
                    <Input 
                      id="full_name" 
                      placeholder="John Doe" 
                      value={formData.full_name}
                      onChange={e => setFormData({...formData, full_name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      required
                      disabled={modalMode === 'edit'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <select 
                      id="role"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={formData.role}
                      onChange={e => setFormData({...formData, role: e.target.value as any})}
                    >
                      <option value="user">User</option>
                      <option value="police">Police</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license_plate" className="flex justify-between">
                      License Plate
                      <span className="text-muted-foreground font-normal text-[0.7rem] uppercase tracking-wider">Optional</span>
                    </Label>
                    <Input 
                      id="license_plate" 
                      placeholder="ABC-1234" 
                      value={formData.license_plate}
                      onChange={e => setFormData({...formData, license_plate: e.target.value})}
                    />
                  </div>
                </div>

                {modalMode === 'create' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password"
                        value={formData.password}
                        onChange={e => setFormData({...formData, password: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input 
                        id="confirmPassword" 
                        type="password"
                        value={formData.confirmPassword}
                        onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                )}

                {modalMode === 'edit' && (
                  <div className="flex items-center space-x-2 py-2">
                    <Switch 
                      id="is_active" 
                      checked={formData.is_active}
                      onCheckedChange={checked => setFormData({...formData, is_active: checked})}
                    />
                    <Label htmlFor="is_active">User Account Active</Label>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Check className="w-4 h-4 mr-2" />
                    )}
                    {modalMode === 'create' ? 'Create User' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
}
