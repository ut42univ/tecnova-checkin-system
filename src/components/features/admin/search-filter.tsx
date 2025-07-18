import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SearchFilterProps {
  onSearch: (filters: SearchFilters) => void;
  loading?: boolean;
}

export interface SearchFilters {
  startDate?: string;
  endDate?: string;
  guestName?: string;
}

export function SearchFilter({ onSearch, loading = false }: SearchFilterProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guestName, setGuestName] = useState("");

  const handleSearch = () => {
    onSearch({
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      guestName: guestName || undefined,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>検索・フィルター</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="startDate">開始日</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="endDate">終了日</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="guestName">ゲスト名</Label>
            <Input
              id="guestName"
              placeholder="名前で検索"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              className="w-full"
              disabled={loading}
            >
              検索
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
