"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiResponse, GuestData } from "@/types/api";

function RegisterCompleteContent() {
  const searchParams = useSearchParams();
  const guestId = searchParams.get("guestId");
  const [guest, setGuest] = useState<GuestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGuest = async () => {
      if (!guestId) {
        setError("ゲスト情報が見つかりません");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/guests/${guestId}`);
        const result: ApiResponse<GuestData> = await response.json();

        if (!result.success) {
          setError("ゲスト情報の取得に失敗しました");
          return;
        }

        setGuest(result.data!);
      } catch (err) {
        console.error("Fetch guest error:", err);
        setError("サーバーエラーが発生しました");
      } finally {
        setLoading(false);
      }
    };

    fetchGuest();
  }, [guestId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error || !guest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-700">エラー</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">{error}</p>
            <Link href="/">
              <Button variant="outline">ホームに戻る</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* 成功メッセージ */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-white">✓</span>
          </div>
          <h1 className="text-4xl font-bold text-green-800 mb-4">登録完了！</h1>
          <p className="text-xl text-green-700">登録が完了しました</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">あなたの情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">あなたの番号</p>
                <p className="text-3xl font-bold text-blue-800">
                  {guest.displayId}
                </p>
                <p className="text-sm text-gray-600">
                  この番号を覚えておいてください！
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-600">お名前</p>
                <p className="text-xl font-semibold">{guest.name}</p>
              </div>
              {guest.contact && (
                <div>
                  <p className="text-sm text-gray-600">メールアドレス</p>
                  <p className="text-xl">{guest.contact}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 説明 */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">
                次は何をすればいいの？
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  <p>入退場画面であなたの番号または名前を 入力してください</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  <p>
                    「チェックイン」ボタンを押して入場の手続きを してください
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  <p>帰る時は「チェックアウト」ボタンを押すのを 忘れずに！</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ナビゲーション */}
        <div className="flex gap-4">
          <Link href="/" className="flex-1">
            <Button variant="outline" size="lg" className="w-full">
              ホームに戻る
            </Button>
          </Link>
          <Link href="/checkin" className="flex-1">
            <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
              今すぐチェックイン
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <Skeleton className="h-8 w-48 mx-auto mb-2" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <Skeleton className="h-24 w-24 rounded-full mx-auto" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40 mx-auto" />
              <Skeleton className="h-4 w-32 mx-auto" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-16 mb-1" />
                <Skeleton className="h-6 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
            <div>
              <Skeleton className="h-4 w-12 mb-1" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

export default function RegisterCompletePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RegisterCompleteContent />
    </Suspense>
  );
}
