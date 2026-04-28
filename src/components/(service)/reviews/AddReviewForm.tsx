'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
	TipTapEditor,
} from '@/components';
import { ReviewFormSchema } from './schema';
import { reviewsCategoryList } from '@/constants';

export default function AddReviewForm({ form }: { form: UseFormReturn<ReviewFormSchema> }) {
	return (
		<Form {...form}>
			<form id="review-apply-form" className="flex flex-col gap-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">제 목</FormLabel>
							<FormControl>
								<Input placeholder="제목" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">카테고리</FormLabel>
							<Select onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger className="w-full cursor-pointer">
										<SelectValue placeholder="카테고리 선택" />
									</SelectTrigger>
								</FormControl>
								<SelectContent className="max-h-60">
									<SelectGroup>
										{reviewsCategoryList.map((category, idx) => (
											<SelectItem key={`${category}_${idx}`} value={category} className="cursor-pointer">
												{category}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">내 용</FormLabel>
							<FormControl>
								<TipTapEditor value={field.value} onChange={field.onChange} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
