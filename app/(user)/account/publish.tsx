import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
} from "react-native";

export default function PublishScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Đăng truyện</Text>
      <TextInput style={styles.input} placeholder="Tên truyện" />
      <TextInput style={styles.input} placeholder="Tác giả" />
      <TextInput style={styles.input} placeholder="Thể loại" />
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Mô tả truyện"
        multiline
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Tạo truyện</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, gap: 14, backgroundColor: "#F6F7FB", flexGrow: 1 },
  title: { color: "#111827", fontSize: 28, fontWeight: "700", marginBottom: 8 },
  input: {
    minHeight: 52,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    color: "#111827",
  },
  multiline: { minHeight: 120, paddingTop: 16, textAlignVertical: "top" },
  button: {
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: "#0F766E",
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
