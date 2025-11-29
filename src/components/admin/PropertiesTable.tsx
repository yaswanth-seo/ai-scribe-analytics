import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MoreHorizontal, Unlink, Link, User, ExternalLink } from "lucide-react";
import { format } from "date-fns";

export interface PropertyData {
  id: string;
  ga4_property_id: string;
  property_name: string;
  domain: string;
  is_active: boolean;
  connected_at: string;
  disconnected_at: string | null;
  user_id: string;
  user_email: string;
  user_name: string | null;
}

interface PropertiesTableProps {
  properties: PropertyData[];
  onDisconnect: (property: PropertyData) => void;
  onReconnect: (property: PropertyData) => void;
  onViewUser: (userId: string) => void;
}

const PropertiesTable = ({
  properties,
  onDisconnect,
  onReconnect,
  onViewUser,
}: PropertiesTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.property_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.user_email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && property.is_active) ||
      (statusFilter === "disconnected" && !property.is_active);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by domain, property name, or user email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Properties</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="disconnected">Disconnected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell">Connected</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProperties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No properties found
                </TableCell>
              </TableRow>
            ) : (
              filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{property.domain}</p>
                        <a 
                          href={`https://${property.domain}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <p className="text-sm text-muted-foreground">{property.property_name}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {property.ga4_property_id}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <button 
                      onClick={() => onViewUser(property.user_id)}
                      className="text-left hover:underline"
                    >
                      <p className="font-medium">{property.user_email}</p>
                      {property.user_name && (
                        <p className="text-sm text-muted-foreground">{property.user_name}</p>
                      )}
                    </button>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {property.is_active ? (
                      <Badge variant="default" className="bg-success/10 text-success hover:bg-success/20">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Disconnected</Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {format(new Date(property.connected_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewUser(property.user_id)}>
                          <User className="h-4 w-4 mr-2" />
                          View Owner
                        </DropdownMenuItem>
                        {property.is_active ? (
                          <DropdownMenuItem 
                            onClick={() => onDisconnect(property)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Unlink className="h-4 w-4 mr-2" />
                            Disconnect
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => onReconnect(property)}>
                            <Link className="h-4 w-4 mr-2" />
                            Reconnect
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Showing {filteredProperties.length} of {properties.length} properties
      </div>
    </div>
  );
};

export default PropertiesTable;
