let app = require("@/config");
const guidEmpty = "00000000-0000-0000-0000-000000000000";
uni.chosePostion = function (role) {
	app.hasChosePosition = true;
	app.defaultDepartId = role.departId;
	uni.setStorageSync("defaultDepartId", role.departId);
	uni.setStorageSync("position", role.departName + role.position);
	uni.setStorageSync("role", role.position);
	uni.setStorageSync("userRole", role);
}

uni.switchDashboard = function (role) {
	console.log(role);
	let checkPermission = app.checkPermission;
	let defaultDepartId = app.defaultDepartId || guidEmpty;
	let flag = false;
	if (defaultDepartId === guidEmpty) {
		flag = true;
	}

	if (!app.hasChosePosition) {
		page = "/iuc/login/roleSelection";
		uni.navigateTo({
			url: page
		})
		return;
	}
	let page = "/iuc/index/index-";
	if (role.position === "指导老师") {
		page += "teacher";
	} else if (role.position === "普通用户") {
		page += "student";
	} else if (role.position === "管理员") {
		if (checkPermission("Organization.TwAdminUser")) {
			page += "tw";
		} else if (checkPermission("Organization.XSLHH")) {
			page += "xslhh"
		} else if (checkPermission("Organization.UnitAdminUser")) {
			page += "manager"; // 挂靠单位管理
		} else if (checkPermission("Organization.DepartAdminUser")) {
			page += "depart-manager"; // 社团管理
		}
	} else {
		page += "student";
	}
	/*if (checkPermission("Organization.TwAdminUser")) {
		page += "tw";
	} else if (checkPermission("Organization.XSLHH")) {
		page += "xslhh"
	} else if (checkPermission("Organization.UnitAdminUser")) {
		page += "manager"; // 挂靠单位管理
	} else if (checkPermission("Organization.DepartAdminUser")) {
		page += "depart-manager"; // 社团管理
	} else if (checkPermission("Organization.TeacherAdmin")) {
		page += "teacher";
	} else if (checkPermission("Organization.Student")) {
		page += "student";
	} else {
		page = "/iuc/index/index";
	} */

	if (flag) {
		page = "/iuc/index/index-student";
	}

	uni.navigateTo({
		url: page
		// url: "uc/login/login"
	})
}

uni.toProfile = function () {
	uni.navigateTo({
		url: "/iuc/profile/profile"
	})
}
