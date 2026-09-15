import { useRouter } from "expo-router";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

const categories = [
  "Tất cả",
  "Truyện tranh",
  "Cổ tích",
  "Khoa học & Khám phá",
  "Kỹ năng sống",
  "Sách song ngữ",
];

const featuredBooks = [
  {
    title: "Dế Mèn Phiêu Lưu Ký",
    author: "Tô Hoài",
    rating: "4.8",
    accent: "#FBBF24",
  },
  {
    title: "Câu Chuyện Về Mặt Trời",
    author: "Minh Anh",
    rating: "4.7",
    accent: "#A78BFA",
  },
  {
    title: "Khám Phá Vũ Trụ",
    author: "Khoa Học VN",
    rating: "4.9",
    accent: "#60A5FA",
  },
  {
    title: "Sống Tích Cực",
    author: "Lê Hạnh",
    rating: "4.6",
    accent: "#34D399",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const openBook = (title: string) => {
    router.push({ pathname: "/book-detail", params: { id: title } });
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View>
            <ThemedText type="subtitle">Chào buổi sáng, Yên! 👋</ThemedText>
          </View>
          <Pressable
            style={styles.notificationButton}
            onPress={() => router.push("/(user)/messages")}
          >
            <ThemedText style={styles.notificationIcon}>🔔</ThemedText>
          </Pressable>
          <Pressable
            style={styles.notificationButton}
            onPress={() => router.push("/settings")}
          >
            <ThemedText style={styles.notificationIcon}>⚙️</ThemedText>
          </Pressable>
        </View>

        <View style={styles.searchBar}>
          <ThemedText style={styles.searchIcon}>🔍</ThemedText>
          <TextInput
            placeholder="Tìm kiếm tên sách, tác giả, thể loại..."
            placeholderTextColor="#8A8A8A"
            style={styles.searchInput}
          />
          <Pressable style={styles.filterButton}>
            <ThemedText style={styles.filterIcon}>☰</ThemedText>
          </Pressable>
        </View>

        <Pressable
          style={styles.continueCard}
          onPress={() => openBook("Dế Mèn Phiêu Lưu Ký")}
        >
          <View style={styles.bookCover}>
            <ThemedText style={styles.coverText}>Dế Mèn</ThemedText>
          </View>

          <View style={styles.bookInfo}>
            <ThemedText type="defaultSemiBold" style={styles.bookTitle}>
              Dế Mèn Phiêu Lưu Ký
            </ThemedText>
            <ThemedText style={styles.authorText}>Tô Hoài</ThemedText>
            <ThemedText style={styles.progressText}>Đã đọc 65%</ThemedText>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>

          <Pressable
            style={styles.playButton}
            onPress={() =>
              router.push({ pathname: "/reader", params: { chapter: "65" } })
            }
          >
            <ThemedText style={styles.playIcon}>▶</ThemedText>
          </Pressable>
        </Pressable>

        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Danh mục</ThemedText>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((category) => (
            <Pressable
              key={category}
              style={[
                styles.categoryChip,
                category === "Tất cả" && styles.categoryChipActive,
              ]}
            >
              <ThemedText
                style={[
                  styles.categoryText,
                  category === "Tất cả" && styles.categoryTextActive,
                ]}
              >
                {category}
              </ThemedText>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sectionHeaderRow}>
          <ThemedText type="subtitle">Sách nổi bật</ThemedText>
          <Pressable onPress={() => router.push("/(user)/library")}>
            <ThemedText style={styles.viewAllText}>Xem tất cả</ThemedText>
          </Pressable>
        </View>

        <View style={styles.bookGrid}>
          {featuredBooks.map((book) => (
            <Pressable
              key={book.title}
              style={styles.bookItem}
              onPress={() => openBook(book.title)}
            >
              <View
                style={[styles.bookThumb, { backgroundColor: book.accent }]}
              >
                <ThemedText style={styles.thumbLabel}>
                  {book.title.split(" ")[0]}
                </ThemedText>
              </View>
              <ThemedText style={styles.gridBookTitle}>{book.title}</ThemedText>
              <ThemedText style={styles.gridAuthor}>{book.author}</ThemedText>
              <ThemedText style={styles.ratingText}>
                ⭐ {book.rating}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F9",
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },
  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  notificationIcon: {
    fontSize: 18,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 12,
    height: 52,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1F2937",
  },
  filterButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  filterIcon: {
    fontSize: 16,
  },
  continueCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 14,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  bookCover: {
    width: 72,
    height: 100,
    borderRadius: 14,
    backgroundColor: "#F59E0B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  coverText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  authorText: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 6,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },
  progressFill: {
    width: "65%",
    height: "100%",
    backgroundColor: "#F59E0B",
    borderRadius: 999,
  },
  playButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  playIcon: {
    fontSize: 16,
    color: "#111827",
    marginLeft: 3,
  },
  sectionHeader: {
    marginTop: 28,
    marginBottom: 12,
  },
  categoryScroll: {
    marginBottom: 18,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  categoryChipActive: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  categoryText: {
    fontSize: 13,
    color: "#374151",
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  viewAllText: {
    color: "#4F46E5",
    fontSize: 13,
    fontWeight: "600",
  },
  bookGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 14,
  },
  bookItem: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  bookThumb: {
    height: 150,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  thumbLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  gridBookTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  gridAuthor: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 12,
    color: "#374151",
  },
});
