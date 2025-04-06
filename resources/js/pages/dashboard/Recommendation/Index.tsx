import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Sparkles, Plus, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types';

interface Content {
  id: number;
  title: string;
  image: string;
  order: number;
  district: {
    name: string;
    regency: {
      name: string;
      province: {
        name: string;
      };
    };
  };
}

interface Props {
  recommendations: Content[];
}

export default function Index({ recommendations }: Props) {
  const [items, setItems] = useState<Content[]>(recommendations);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Recommendations',
      href: '/dashboard/recommendations',
    },
  ];

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    // Update the order property for each item
    const updatedItems = reorderedItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    setItems(updatedItems);

    // Send the new order to the server
    const orders = updatedItems.map((item) => ({
      id: item.id,
      order: item.order,
    }));

    axios
      .put('/dashboard/recommendations/update-order', { orders })
      .then(() => {
        toast.success('Order updated successfully');
      })
      .catch((error) => {
        console.error('Error updating order:', error);
        toast.error('Failed to update order');
        // Revert to the original order if there's an error
        setItems(recommendations);
      });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this content from recommendations?')) {
      return;
    }

    try {
      await axios.delete(`/dashboard/recommendations/${id}`);
      setItems(items.filter(item => item.id !== id));
      toast.success('Content removed from recommendations');
    } catch (error) {
      console.error('Error deleting recommendation:', error);
      toast.error('Failed to remove content from recommendations');
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Recommendations" />
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Recommendations</h1>
          </div>
          <Link href="/dashboard/recommendations/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Recommendation
            </Button>
          </Link>
        </div>

        <div className="rounded-lg border p-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No recommendations found.</p>
              <Link href="/dashboard/recommendations/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Recommendation
                </Button>
              </Link>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="recommendations">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm"
                          >
                            <div className="w-16 h-16 flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <div className="flex-grow">
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-gray-600">
                                {item.district.name}, {item.district.regency.name}, {item.district.regency.province.name}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleDelete(item.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>
    </AppLayout>
  );
} 