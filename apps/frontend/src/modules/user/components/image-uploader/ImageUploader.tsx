import { Card, Button } from '@/components/ui';
import { Icon } from '@/components/common';
import { useRef, useState } from 'react';
import { toastWrapper } from '@/libs/utils';

interface ImageUploaderProps {
	initialImage?: string;
	onImageUpload?: (file: File) => Promise<void>;
	onImageDelete?: () => Promise<void>;
}

export const ImageUploader = ({
	initialImage,
	onImageUpload,
	onImageDelete,
}: ImageUploaderProps) => {
	const [image, setImage] = useState<string | null>(initialImage || null);
	const [isUploading, setIsUploading] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith('image/')) {
			toastWrapper('Please select an image file (JPEG, PNG, etc.)', 'error');
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			toastWrapper('Image size should be less than 5MB', 'error');

			return;
		}

		const reader = new FileReader();
		reader.onload = (e) => {
			setImage(e.target?.result as string);
		};
		reader.readAsDataURL(file);
	};

	const handleUpload = async () => {
		if (!fileInputRef.current?.files?.[0]) return;

		try {
			setIsUploading(true);
			const file = fileInputRef.current.files[0];

			if (onImageUpload) {
				await onImageUpload(file);
				toastWrapper('Profile image uploaded successfully', 'success');
			}
		} catch (error) {
			console.error('Error uploading image:', error);
			toastWrapper('There was a problem uploading your image', 'error');
		} finally {
			setIsUploading(false);
		}
	};

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleDelete = async () => {
		try {
			setIsDeleting(true);

			if (onImageDelete) {
				await onImageDelete();
			}

			setImage(null);
			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}

			toastWrapper('Profile image removed successfully', 'success');
		} catch (error) {
			console.error('Error deleting image:', error);
			toastWrapper('There was a problem deleting your image', 'error');
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="space-y-4">
			<div className="overflow-hidden p-1">
				<div className="relative mx-auto aspect-square w-full max-w-[300px] overflow-hidden rounded-full border-3 border-violet-400 bg-violet-50">
					{image ? (
						<img
							src={image || '/placeholder.svg'}
							alt="Profile preview"
							className="object-cover"
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center">
							<Icon
								name={'UserCircle2'}
								className={'text-muted-foreground h-1/3 w-1/3'}
							/>
						</div>
					)}
				</div>
			</div>

			<div className="flex flex-col justify-center gap-2 sm:flex-row">
				<input
					type="file"
					ref={fileInputRef}
					onChange={handleFileChange}
					accept="image/*"
					className="hidden"
				/>

				<Button
					type="button"
					onClick={handleUploadClick}
					disabled={isUploading}
				>
					<Icon name={'Upload'} className={'mr-2 h-4 w-4'} />
					Select Image
				</Button>

				{image && (
					<>
						<Button
							type="button"
							variant="default"
							onClick={handleUpload}
							disabled={isUploading || isDeleting}
						>
							{isUploading ? 'Uploading...' : 'Upload Image'}
						</Button>

						<Button
							type="button"
							variant="outline"
							onClick={handleDelete}
							disabled={isUploading || isDeleting}
							className={'text-purple-950'}
						>
							<Icon name={'Trash'} className={'mr-2 h-4 w-4'} />

							{isDeleting ? 'Deleting...' : 'Remove'}
						</Button>
					</>
				)}
			</div>
		</div>
	);
};
