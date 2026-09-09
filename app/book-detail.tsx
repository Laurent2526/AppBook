import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function BookDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const title = id ?? "Chi tiết truyện";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>‹ Quay lại</Text>
        </Pressable>
        <View style={styles.cover}>
          <Text style={styles.coverText}>{title.slice(0, 2).toUpperCase()}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Thông tin và các chương của truyện</Text>
        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push({ pathname: "/reader", params: { bookId: id, chapter: "1" } })}
        >
          <Text style={styles.primaryButtonText}>Đọc truyện</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  content: { flex: 1, padding: 24 },
  back: { color: "#0F766E", fontSize: 16, fontWeight: "600" },
  cover: {
    width: 150,
    height: 210,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 44,
    borderRadius: 18,
    backgroundColor: "#F59E0B",
  },
  coverText: { color: "#FFFFFF", fontSize: 38, fontWeight: "700" },
  title: { marginTop: 24, color: "#111827", fontSize: 24, fontWeight: "700", textAlign: "center" },
  subtitle: { marginTop: 8, color: "#6B7280", fontSize: 14, textAlign: "center" },
  primaryButton: { marginTop: 28, paddingVertical: 15, borderRadius: 14, backgroundColor: "#0EA5A4", alignItems: "center" },
  primaryButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
