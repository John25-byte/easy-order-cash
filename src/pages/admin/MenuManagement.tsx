 import { useState } from 'react';
 import { AdminLayout } from '@/components/layout/AdminLayout';
 import { useMenu } from '@/context/MenuContext';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Textarea } from '@/components/ui/textarea';
 import { Switch } from '@/components/ui/switch';
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
 } from '@/components/ui/dialog';
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from '@/components/ui/select';
 import { Plus, Pencil, Trash2, Search } from 'lucide-react';
 import { formatPrice } from '@/lib/currency';
 import { toast } from 'sonner';
 import { MenuItem } from '@/types/menu';
 
 export default function MenuManagement() {
   const { menuItems, categories, addMenuItem, updateMenuItem, deleteMenuItem, toggleAvailability } = useMenu();
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedCategory, setSelectedCategory] = useState<string>('all');
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
 
   // Form state
   const [formData, setFormData] = useState({
     name: '',
     description: '',
     price: '',
     category: '',
     image: '',
     available: true,
   });
 
   const filteredItems = menuItems.filter((item) => {
     const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
     const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
     return matchesSearch && matchesCategory;
   });
 
   const resetForm = () => {
     setFormData({
       name: '',
       description: '',
       price: '',
       category: categories[0]?.id || '',
       image: '/placeholder.svg',
       available: true,
     });
     setEditingItem(null);
   };
 
   const handleOpenDialog = (item?: MenuItem) => {
     if (item) {
       setEditingItem(item);
       setFormData({
         name: item.name,
         description: item.description,
         price: item.price.toString(),
         category: item.category,
         image: item.image,
         available: item.available,
       });
     } else {
       resetForm();
     }
     setIsDialogOpen(true);
   };
 
   const handleSubmit = () => {
     if (!formData.name || !formData.price || !formData.category) {
       toast.error('Please fill in all required fields');
       return;
     }
 
     const itemData = {
       name: formData.name,
       description: formData.description,
       price: parseFloat(formData.price),
       category: formData.category,
       image: formData.image || '/placeholder.svg',
       available: formData.available,
     };
 
     if (editingItem) {
       updateMenuItem(editingItem.id, itemData);
       toast.success('Menu item updated successfully');
     } else {
       addMenuItem(itemData);
       toast.success('Menu item added successfully');
     }
 
     setIsDialogOpen(false);
     resetForm();
   };
 
   const handleDelete = (id: string, name: string) => {
     if (confirm(`Are you sure you want to delete "${name}"?`)) {
       deleteMenuItem(id);
       toast.success('Menu item deleted');
     }
   };
 
   return (
     <AdminLayout>
       <div className="space-y-6">
         {/* Header */}
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <div>
             <h1 className="font-display text-3xl font-bold text-foreground">Menu Management</h1>
             <p className="text-muted-foreground mt-1">Add, edit, and manage your menu items</p>
           </div>
           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
             <DialogTrigger asChild>
               <Button variant="orange" onClick={() => handleOpenDialog()}>
                 <Plus className="w-4 h-4 mr-2" />
                 Add Item
               </Button>
             </DialogTrigger>
             <DialogContent className="sm:max-w-md">
               <DialogHeader>
                 <DialogTitle className="font-display">
                   {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                 </DialogTitle>
               </DialogHeader>
               <div className="space-y-4 mt-4">
                 <div>
                   <label className="text-sm font-medium text-foreground">Name *</label>
                   <Input
                     value={formData.name}
                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                     placeholder="Item name"
                     className="mt-1"
                   />
                 </div>
                 <div>
                   <label className="text-sm font-medium text-foreground">Description</label>
                   <Textarea
                     value={formData.description}
                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                     placeholder="Item description"
                     className="mt-1"
                     rows={2}
                   />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="text-sm font-medium text-foreground">Price (KSh) *</label>
                     <Input
                       type="number"
                       value={formData.price}
                       onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                       placeholder="0"
                       className="mt-1"
                     />
                   </div>
                   <div>
                     <label className="text-sm font-medium text-foreground">Category *</label>
                     <Select
                       value={formData.category}
                       onValueChange={(value) => setFormData({ ...formData, category: value })}
                     >
                       <SelectTrigger className="mt-1">
                         <SelectValue placeholder="Select category" />
                       </SelectTrigger>
                       <SelectContent>
                         {categories.map((cat) => (
                           <SelectItem key={cat.id} value={cat.id}>
                             {cat.name}
                           </SelectItem>
                         ))}
                       </SelectContent>
                     </Select>
                   </div>
                 </div>
                 <div>
                   <label className="text-sm font-medium text-foreground">Image URL</label>
                   <Input
                     value={formData.image}
                     onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                     placeholder="https://..."
                     className="mt-1"
                   />
                 </div>
                 <div className="flex items-center justify-between">
                   <label className="text-sm font-medium text-foreground">Available</label>
                   <Switch
                     checked={formData.available}
                     onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
                   />
                 </div>
                 <div className="flex gap-2 pt-4">
                   <Button variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                     Cancel
                   </Button>
                   <Button variant="orange" className="flex-1" onClick={handleSubmit}>
                     {editingItem ? 'Save Changes' : 'Add Item'}
                   </Button>
                 </div>
               </div>
             </DialogContent>
           </Dialog>
         </div>
 
         {/* Filters */}
         <div className="flex flex-col sm:flex-row gap-4">
           <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
             <Input
               placeholder="Search menu items..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="pl-10"
             />
           </div>
           <Select value={selectedCategory} onValueChange={setSelectedCategory}>
             <SelectTrigger className="w-full sm:w-[180px]">
               <SelectValue placeholder="All Categories" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="all">All Categories</SelectItem>
               {categories.map((cat) => (
                 <SelectItem key={cat.id} value={cat.id}>
                   {cat.name}
                 </SelectItem>
               ))}
             </SelectContent>
           </Select>
         </div>
 
         {/* Menu Items Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {filteredItems.map((item) => {
             const category = categories.find((c) => c.id === item.category);
             return (
               <div
                 key={item.id}
                 className="bg-card rounded-xl border border-border p-4 shadow-card hover:shadow-elevated transition-all duration-300"
               >
                 <div className="flex gap-4">
                   <img
                     src={item.image}
                     alt={item.name}
                     className="w-20 h-20 rounded-lg object-cover"
                   />
                   <div className="flex-1 min-w-0">
                     <div className="flex items-start justify-between gap-2">
                       <h3 className="font-display font-semibold text-foreground truncate">
                         {item.name}
                       </h3>
                       <Switch
                         checked={item.available}
                         onCheckedChange={() => toggleAvailability(item.id)}
                       />
                     </div>
                     <p className="text-xs text-muted-foreground mt-0.5">{category?.name}</p>
                     <p className="text-primary font-semibold mt-1">{formatPrice(item.price)}</p>
                   </div>
                 </div>
                 <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                   {item.description}
                 </p>
                 <div className="flex gap-2 mt-4">
                   <Button
                     variant="outline"
                     size="sm"
                     className="flex-1"
                     onClick={() => handleOpenDialog(item)}
                   >
                     <Pencil className="w-4 h-4 mr-1" />
                     Edit
                   </Button>
                   <Button
                     variant="outline"
                     size="sm"
                     className="text-destructive hover:text-destructive"
                     onClick={() => handleDelete(item.id, item.name)}
                   >
                     <Trash2 className="w-4 h-4" />
                   </Button>
                 </div>
               </div>
             );
           })}
         </div>
 
         {filteredItems.length === 0 && (
           <div className="text-center py-12 bg-card rounded-xl border border-border">
             <p className="text-muted-foreground">No menu items found</p>
           </div>
         )}
       </div>
     </AdminLayout>
   );
 }