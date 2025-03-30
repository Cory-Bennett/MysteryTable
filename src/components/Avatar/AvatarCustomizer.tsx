import React from 'react';
import { useAvatarStore } from './avatarStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const AvatarCustomizer: React.FC = () => {
  const { color, setColor } = useAvatarStore();

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  return (
    <Card className="absolute top-4 left-4 z-10 w-64">
      <CardHeader>
        <CardTitle>Customize Avatar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="avatar-color">Color</Label>
            {/* Using a standard HTML color input for simplicity */}
            <Input
              id="avatar-color"
              type="color"
              value={color}
              onChange={handleColorChange}
              className="p-0"
            />
          </div>
          {/* Add more customization options here */}
        </div>
      </CardContent>
    </Card>
  );
};

export default AvatarCustomizer; 