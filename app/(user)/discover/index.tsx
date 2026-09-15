import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Book = {
  title: string;
  description: string;
  coverTitle: string;
  accent: string;
  coverTone: string;
};

const horizontalBooks: Book[] = [
  {
    title: "Theo Bố Đi Ở Rể, Mỹ Nh...",
    description:
      "Ninh Nhuyễn Nhuyễn sống lại, quay về đúng thời điểm cả nhà sắp bị đưa đi cải tạo. Kiếp trước, cô theo mẹ...",
    coverTitle: "Theo Bố Ở Rể - Mỹ Nhân Được Cả Viện Cưng Chiều",
    accent: "#D7795D",
    coverTone: "#F5C18A",
  },
  {
    title: "Nữ Phụ Không Muốn Kết Cục Buồn",
    description:
      "Một lần tỉnh lại, cô quyết định viết lại câu chuyện của mình bằng những lựa chọn hoàn toàn khác...",
    coverTitle: "Nữ Phụ Không Muốn Kết Cục Buồn",
    accent: "#8F9D6A",
    coverTone: "#D9D4A3",
  },
];

const verticalBooks: Book[] = [
  {
    title: "Quận Chúa Yêu Kiều, Được Nhiều Chồng Yêu",
    description:
      "Giữa lúc Tây Ngôn để thanh trừ công thần, Trường Ninh quận chúa của Định Vương phủ lại bất ngờ sống sót. Kh...",
    coverTitle: "Quận Chúa Yêu Kiều - Chàng Yêu",
    accent: "#4E9E79",
    coverTone: "#D9B47D",
  },
  {
    title: "Sau Khi Gả Cho Vương Gia Ốm Yếu",
    description:
      "Nàng vốn chỉ muốn sống yên ổn, nào ngờ lại trở thành người được cả phủ nâng niu...",
    coverTitle: "Sau Khi Gả Cho Vương Gia Ốm Yếu",
    accent: "#B47576",
    coverTone: "#E1B5A0",
  },
];

const floatingBooks = ["#D99D76", "#88A98B", "#C98F9E", "#C9AC70", "#8098B1"];

function BookCover({ book, large = false }: { book: Book; large?: boolean }) {
  return (
    <View
      style={[
        styles.cover,
        large && styles.largeCover,
        { backgroundColor: book.coverTone },
      ]}
    >
      <View style={[styles.coverAccent, { backgroundColor: book.accent }]} />
      <Text style={styles.coverKicker}>NGÔN TÌNH</Text>
      <Text style={[styles.coverTitle, large && styles.largeCoverTitle]}>
        {book.coverTitle}
      </Text>
      <Text style={styles.coverSeal}>心</Text>
      <View style={styles.coverLine} />
      <Text style={styles.coverFooter}>MỘT CÂU CHUYỆN ĐẸP</Text>
    </View>
  );
}

export default function HelloScreen() {
  const router = useRouter();
  const [activeFeed, setActiveFeed] = useState<"Đề Xuất" | "Theo Dõi">(
    "Đề Xuất",
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View style={styles.pillTabs}>
            {(["Đề Xuất", "Theo Dõi"] as const).map((feed) => (
              <Pressable
                key={feed}
                style={[
                  styles.pillTab,
                  activeFeed === feed && styles.pillTabActive,
                ]}
                onPress={() => setActiveFeed(feed)}
              >
                {feed === "Đề Xuất" && (
                  <MaterialIcons
                    name="explore"
                    size={18}
                    color={activeFeed === feed ? "#FFFFFF" : "#7B7C86"}
                  />
                )}
                <Text
                  style={[
                    styles.pillText,
                    activeFeed === feed && styles.pillTextActive,
                  ]}
                >
                  {feed}
                </Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.actionGroup}>
            <Pressable
              style={styles.actionButton}
              onPress={() => router.push("/settings")}
            >
              <MaterialIcons name="settings" size={20} color="#464752" />
            </Pressable>
            <Pressable
              style={styles.actionButton}
              onPress={() => setActiveFeed("Đề Xuất")}
            >
              <MaterialIcons name="refresh" size={21} color="#464752" />
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>☰ Ngôn Tình + Xu...</Text>
          <MaterialIcons name="chevron-right" size={22} color="#9798A2" />
        </View>
        <Pressable
          style={styles.featureCard}
          onPress={() =>
            router.push({
              pathname: "/book-detail",
              params: { id: horizontalBooks[0].title },
            })
          }
        >
          <View style={styles.featureCopy}>
            <Text style={styles.featureTitle}>{horizontalBooks[0].title}</Text>
            <Text style={styles.featureDescription}>
              {horizontalBooks[0].description}
            </Text>
            <View style={styles.readMore}>
              <Text style={styles.readMoreText}>Đọc ngay</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#258A82" />
            </View>
          </View>
          <View style={styles.stackedCovers}>
            <View
              style={[
                styles.backCover,
                { backgroundColor: horizontalBooks[0].accent },
              ]}
            />
            <BookCover book={horizontalBooks[0]} />
          </View>
        </Pressable>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>☰ List Ngôn Tình + Tình Cảm</Text>
          <MaterialIcons name="chevron-right" size={22} color="#9798A2" />
        </View>
        {verticalBooks.map((book) => (
          <Pressable
            key={book.title}
            style={styles.verticalCard}
            onPress={() =>
              router.push({
                pathname: "/book-detail",
                params: { id: book.title },
              })
            }
          >
            <View>
              <BookCover book={book} large />
              <View
                style={[styles.statusBadge, { backgroundColor: book.accent }]}
              >
                <Text style={styles.statusText}>Hoàn thành</Text>
              </View>
            </View>
            <View style={styles.verticalCopy}>
              <Text style={styles.verticalTitle}>{book.title}</Text>
              <Text style={styles.verticalDescription}>{book.description}</Text>
              <View style={styles.moreButton}>
                <Text style={styles.moreText}>Xem Thêm &gt;&gt;</Text>
              </View>
            </View>
          </Pressable>
        ))}
        <View style={styles.floatingBooks}>
          {floatingBooks.map((color, index) => (
            <View
              key={color}
              style={[
                styles.floatingBook,
                {
                  backgroundColor: color,
                  transform: [{ rotate: `${index % 2 ? 8 : -8}deg` }],
                },
              ]}
            >
              <Text style={styles.floatingMark}>✦</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F5F1",
  },
  content: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 34 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 26,
  },
  pillTabs: {
    flexDirection: "row",
    backgroundColor: "#EAE9E7",
    borderRadius: 24,
    padding: 4,
  },
  pillTab: {
    minHeight: 40,
    paddingHorizontal: 14,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  pillTabActive: { backgroundColor: "#278F87" },
  pillText: { color: "#7B7C86", fontSize: 13, fontWeight: "700" },
  pillTextActive: { color: "#FFFFFF" },
  actionGroup: { flexDirection: "row", gap: 8 },
  actionButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    shadowColor: "#454545",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: { color: "#30313A", fontSize: 17, fontWeight: "800" },
  featureCard: {
    minHeight: 190,
    borderRadius: 24,
    backgroundColor: "#E8DED2",
    padding: 18,
    marginBottom: 26,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#765F4D",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  featureCopy: { flex: 1, paddingRight: 8, justifyContent: "space-between" },
  featureTitle: {
    color: "#333039",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
  },
  featureDescription: {
    color: "#716B6B",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  readMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 10,
  },
  readMoreText: { color: "#258A82", fontSize: 12, fontWeight: "800" },
  stackedCovers: {
    width: 122,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  backCover: {
    width: 92,
    height: 142,
    borderRadius: 8,
    position: "absolute",
    right: 0,
    transform: [{ rotate: "10deg" }],
    opacity: 0.8,
  },
  cover: {
    width: 94,
    height: 144,
    borderRadius: 8,
    padding: 9,
    overflow: "hidden",
    shadowColor: "#44382F",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 3 },
    elevation: 4,
  },
  largeCover: { width: 104, height: 150 },
  coverAccent: {
    position: "absolute",
    width: 52,
    height: 52,
    borderRadius: 26,
    top: 15,
    right: -12,
    opacity: 0.65,
  },
  coverKicker: {
    color: "#6E4939",
    fontSize: 7,
    letterSpacing: 1,
    fontWeight: "800",
  },
  coverTitle: {
    color: "#63493D",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "900",
    marginTop: 22,
  },
  largeCoverTitle: { fontSize: 13, lineHeight: 17 },
  coverSeal: {
    color: "#9A5B50",
    fontSize: 25,
    textAlign: "right",
    marginTop: 9,
  },
  coverLine: {
    height: 1,
    backgroundColor: "#9A6C56",
    opacity: 0.5,
    marginTop: "auto",
  },
  coverFooter: {
    color: "#74584B",
    fontSize: 6,
    marginTop: 5,
    fontWeight: "700",
  },
  verticalCard: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    marginBottom: 14,
    shadowColor: "#454545",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  statusBadge: {
    alignSelf: "center",
    marginTop: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  statusText: { color: "#FFFFFF", fontSize: 10, fontWeight: "800" },
  verticalCopy: { flex: 1, paddingLeft: 15, paddingTop: 3 },
  verticalTitle: {
    color: "#32333B",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "800",
  },
  verticalDescription: {
    color: "#777780",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 9,
  },
  moreButton: { alignSelf: "flex-end", marginTop: "auto" },
  moreText: { color: "#278F87", fontSize: 12, fontWeight: "800" },
  floatingBooks: {
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 11,
    marginTop: 6,
  },
  floatingBook: {
    width: 45,
    height: 45,
    borderRadius: 23,
    borderWidth: 3,
    borderColor: "#F7F5F1",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  floatingMark: { color: "#FFFFFF", fontSize: 17, opacity: 0.85 },
});
