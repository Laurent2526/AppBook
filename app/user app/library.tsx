import React from "react";
import { useRouter } from "expo-router";
import {
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

const tabs = ["Lịch sử", "Tủ truyện", "Bộ sưu tập", "Mua combo"];

const historyData = [
  {
    id: "1",
    title: "Xuyên Sách: Con Gái Ba Tuổi Rưỡi Của Tổng Tài Bá Đạo",
    chapter: "» Chương 55",
    time: "3 tháng trước",
    color: "#F59E0B",
  },
  {
    id: "2",
    title: "Người Từng Là Lão Giả Của Ta",
    chapter: "» Chương 18",
    time: "1 tuần trước",
    color: "#60A5FA",
  },
  {
    id: "3",
    title: "Hệ Thống Tái Sinh Của Tôi",
    chapter: "» Chương 41",
    time: "2 ngày trước",
    color: "#34D399",
  },
  {
    id: "4",
    title: "Thần Thoại Mưa Đêm",
    chapter: "» Chương 12",
    time: "5 giờ trước",
    color: "#F472B6",
  },
];

export default function LibraryScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  const visibleItems = activeTab === "Lịch sử" ? historyData : historyData.slice(0, 2);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.headerWrap}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabRow}
          >
            {tabs.map((tab) => (
              <Pressable
                key={tab}
                style={styles.tabItem}
                onPress={() => setActiveTab(tab)}
              >
                <View style={styles.tabContent}>
                  <ThemedText
                    style={[styles.tabText, tab === activeTab && styles.activeTabText]}
                  >
                    {tab}
                  </ThemedText>
                  {tab === "Lịch sử" && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>4</Text>
                    </View>
                  )}
                </View>
                {tab === activeTab && <View style={styles.activeLine} />}
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput
              placeholder="Nhập tên truyện..."
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>

          <Pressable style={styles.filterButton}>
            <Text style={styles.filterIcon}>⏷</Text>
            <ThemedText style={styles.filterText}>Chọn</ThemedText>
          </Pressable>
        </View>

        <View style={styles.listWrapper}>
          <FlatList
            data={visibleItems}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                style={styles.historyItem}
                onPress={() =>
                  router.push({
                    pathname: "/reader",
                    params: { bookId: item.id, chapter: item.chapter.replace("» Chương ", "") },
                  })
                }
              >
                <View style={[styles.cover, { backgroundColor: item.color }]}>
                  <Text style={styles.coverText}>
                    {item.title.slice(0, 2).toUpperCase()}
                  </Text>
                </View>

                <View style={styles.itemContent}>
                  <ThemedText style={styles.bookTitle} numberOfLines={2}>
                    {item.title}
                  </ThemedText>
                  <View style={styles.metaRow}>
                    <Text style={styles.chapter}>{item.chapter}</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <Text style={styles.timeIcon}>◔</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                </View>

                <Text style={styles.arrow}>›</Text>
              </Pressable>
            )}
          />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  safeArea: {
    flex: 1,
  },
  headerWrap: {
    paddingTop: 16,
    paddingBottom: 10,
    backgroundColor: "#F5F7FA",
  },
  tabRow: {
    paddingHorizontal: 16,
    gap: 18,
    alignItems: "flex-end",
  },
  tabItem: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
  },
  activeTabText: {
    color: "#0F766E",
  },
  badge: {
    marginLeft: 6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  activeLine: {
    width: 52,
    height: 3,
    borderRadius: 999,
    backgroundColor: "#0EA5A4",
    marginTop: 8,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 14,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 54,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  searchIcon: {
    fontSize: 18,
    color: "#6B7280",
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 54,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
  },
  filterIcon: {
    fontSize: 18,
    color: "#0F172A",
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  listWrapper: {
    flex: 1,
    marginHorizontal: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 3 },
  },
  listContent: {
    paddingHorizontal: 10,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F7",
  },
  cover: {
    width: 62,
    height: 88,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  coverText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  itemContent: {
    flex: 1,
    justifyContent: "center",
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  chapter: {
    fontSize: 13,
    color: "#047857",
    fontWeight: "600",
  },
  timeIcon: {
    fontSize: 12,
    color: "#6B7280",
    marginRight: 6,
  },
  timeText: {
    fontSize: 12,
    color: "#6B7280",
  },
  arrow: {
    fontSize: 26,
    color: "#9CA3AF",
    marginLeft: 10,
  },
});
