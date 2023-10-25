import router from "@/router";
import { useAppStore } from "@/store/app";

export function catchErrorDefault(error: any) {
  console.log(error)
  if (error.code === "ERR_NETWORK") {
    useAppStore().setSnackbar(
      "Por favor, verifique sua conexão e tente novamente. Se o erro persistir, entre em contato com o suporte."
    );
    return;
  }

  if (error.response.status === 401) {
    useAppStore().signOut();

    window.localStorage.removeItem("apiToken");
    window.localStorage.removeItem("appUser");

    router.push("/login");
    return;
  }

  if (error.response?.data?.error) {
    useAppStore().setSnackbar(error.response.data.error);
  } else {
    useAppStore().setSnackbar(
      "Ocorreu um erro desconhecido. Por favor, recarregue a página e tente novamente. Se o erro persistir, entre em contato com o suporte."
    );
  }

  console.log(error);
}

export function formattedDate(date: string) {
  let localDate = new Date(date).toLocaleString().substring(0, 17);
  let dateSplitted = localDate.split(",");
  return `${dateSplitted[0]} ${dateSplitted[1]}`;
}

export function parseDate(date: string) {
  let splittedDate = date.split("/");
  return `${splittedDate[2]}-${splittedDate[1]}-${splittedDate[0]}`;
}

export function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function downloadBase64(filename: string, base64: string) {
  var mediaType =
    "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";
  var a = document.createElement("a");
  a.href = mediaType + base64;
  a.download = filename + ".xlsx";
  a.click();
}

export function cloneDeep(array: Array<any> | any) {
  return JSON.parse(JSON.stringify(array));
}

export function parsePhone(phone: string) {
  return phone
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d)(\d{4})$/, "$1-$2");
}

export function defineMethod(entity: any): "update" | "create" {
  return !entity.hasOwnProperty("id") || entity.id === 0 ? "create" : "update";
}

export function handleAPISuccess(entity: any, message?: string) {
  let defaultMessage = message ?? "Operação realizada com sucesso!";

  entity.hasOwnProperty("message")
    ? useAppStore().setSnackbar(entity.message)
    : useAppStore().setSnackbar(defaultMessage);
}

export function setPeriodStartDate(date: string) {
  let appStore = useAppStore();
  let businessHourStart = (appStore.appUser as any).customer.businessHourStart;

  return `${date} ${businessHourStart}:00:00-03`;
}

export function addOneMinute(date: string) {
  let currentDate = new Date(date);
  currentDate.setMinutes(currentDate.getMinutes() + 1);
  currentDate.setHours(currentDate.getHours() - 3);
  let dateSplitted = currentDate.toISOString().split('T');

  return dateSplitted[0] + ' ' + dateSplitted[1].split('.')[0];
}

export function setPeriodEndDate(date: string) {
  let appStore = useAppStore();
  let businessHourEnd = (appStore.appUser as any).customer.businessHourEnd;
  let businessHourStart = (appStore.appUser as any).customer.businessHourStart;

  if (businessHourEnd < businessHourStart) {
    let startDate = new Date(date + " 00:00:00");
    startDate.setDate(startDate.getDate() + 1);
    let targetDay = startDate.toISOString().substring(0, 10);

    return `${targetDay} ${businessHourEnd - 1}:59:59-03`;
  } else {
    return `${date} ${businessHourEnd - 1}:59:59-03`;
  }
}
