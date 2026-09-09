import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function ReaderScreen() {
  const router = useRouter();
  const { bookId, chapter } = useLocalSearchParams<{ bookId?: string; chapter?: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.back}>‹</Text>
          </Pressable>
          <Text style={styles.chapter}>Chương {chapter ?? "1"}</Text>
          <View style={styles.spacer} />
        </View>
        <Text style={styles.title}>{bookId ?? "Đang đọc truyện"}</Text>
        <Text style={styles.body}>
          Nội dung chương truyện sẽ được hiển thị tại đây. Bạn có thể kết nối dữ liệu thật vào màn hình đọc này.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFCF5" },
  content: { flex: 1, padding: 24 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  back: { color: "#0F766E", fontSize: 34, lineHeight: 34 },
  chapter: { color: "#374151", fontSize: 15, fontWeight: "700" },
  spacer: { width: 24 },
  title: { marginTop: 34, color: "#111827", fontSize: 24, fontWeight: "700" },
  body: { marginTop: 24, color: "#374151", fontSize: 18, lineHeight: 32 },
});
