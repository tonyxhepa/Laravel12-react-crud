import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from "lucide-react";
import { FormEventHandler } from "react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts Create',
        href: '/posts/create',
    },
];

type PostForm = {
  title: string;
  content: string;
  image: File | null;
};

export default function PostCreate() {
    const { data, setData, post, processing, errors } = useForm<PostForm>({
          title: '',
          content: '',
          image: null,
      });

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) {
              setData('image', file);
          }
      };

      const submit: FormEventHandler = (e) => {
          e.preventDefault();
          post(route('posts.store'));
      };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Post Create" />
            <section className="max-w-md mx-auto p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
              <form className="flex flex-col gap-6" onSubmit={submit}>
                  <div className="grid gap-6">
                      <div className="grid gap-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                              id="title"
                              type="title"
                              value={data.title}
                              onChange={(e) => setData('title', e.target.value)}
                              placeholder="First post"
                          />
                          <InputError message={errors.title} />
                      </div>
                      <div className="grid gap-2">
                          <Label htmlFor="image">Image</Label>
                          <Input
                              id="image"
                              type="file"
                              onChange={handleFileChange}
                          />
                          <InputError message={errors.image} />
                      </div>
                      <div className="grid gap-2">
                          <Label htmlFor="content">Content</Label>
                         <Textarea
                              id="content"
                              value={data.content}
                              onChange={(e) => setData('content', e.target.value)}
                          />
                          <InputError message={errors.content} />
                      </div>
                      <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                          {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                          Store
                      </Button>
                  </div>
              </form>
            </section>
        </AppLayout>
    );
}
