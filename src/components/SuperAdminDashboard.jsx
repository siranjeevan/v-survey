import { useEffect, useState } from "react";
// import { supabase } from "./supabaseClient"; // 👈 make sure you configured supabase client
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

export default function SuperAdminDashboard() {
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [clientAdmins, setClientAdmins] = useState([]);

  // ✅ Fetch client admins list
  const fetchClientAdmins = async () => {
    const { data, error } = await supabase.from("client_admins").select("*");
    if (error) {
      console.error(error);
    } else {
      setClientAdmins(data || []);
    }
  };

  useEffect(() => {
    fetchClientAdmins();
  }, []);

  // ✅ Create client admin & send invite
  const handleCreateAdmin = async () => {
    if (!fullName || !email) {
      toast({
        title: "Missing fields",
        description: "Please enter full name and email.",
        variant: "destructive",
      });
      return;
    }

    // Send invite link via Supabase Auth
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      // Insert into your client_admins table
      await supabase
        .from("client_admins")
        .insert([{ full_name: fullName, email }]);

      toast({
        title: "Success",
        description: "Invite link sent to client admin!",
      });

      setFullName("");
      setEmail("");
      fetchClientAdmins();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Create Client Admin Form */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Create Client Admin</CardTitle>
            <p className="text-sm text-muted-foreground">Manage client admin</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <Input
                type="text"
                placeholder="Enter client admin name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email Address</label>
              <Input
                type="email"
                placeholder="Enter client admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button onClick={handleCreateAdmin} className="w-full">
              Create Client Admin
            </Button>
          </CardContent>
        </Card>

        {/* Client Admin List */}
        <Card className="lg:w-96 w-full">
          <CardHeader>
            <CardTitle>Created Client Admins</CardTitle>
          </CardHeader>
          <CardContent>
            {clientAdmins.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No client admins yet.
              </p>
            ) : (
              <ul className="space-y-2">
                {clientAdmins.map((admin) => (
                  <li
                    key={admin.id}
                    className="p-2 border rounded-md flex justify-between"
                  >
                    <span>{admin.full_name}</span>
                    <span className="text-sm text-muted-foreground">
                      {admin.email}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
