// Mock Data
let users = [];
let roles = [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Editor", permissions: ["Read", "Write"] },
];

// Populate Tables
function populateUsers() {
  const usersTable = document.getElementById("usersTable");
  usersTable.innerHTML = "";
  users.forEach((user, index) => {
    usersTable.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>${user.status}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editUser(${index})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteUser(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function populateRoles() {
  const rolesTable = document.getElementById("rolesTable");
  const userRoleSelect = document.getElementById("userRole");
  rolesTable.innerHTML = "";
  userRoleSelect.innerHTML = "";
  roles.forEach((role, index) => {
    rolesTable.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${role.name}</td>
        <td>${role.permissions.join(", ")}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editRole(${index})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteRole(${index})">Delete</button>
        </td>
      </tr>
    `;
    userRoleSelect.innerHTML += `<option value="${role.name}">${role.name}</option>`;
  });
}

// User Management
function openUserModal() {
  document.getElementById("userForm").reset();
  document.getElementById("userModal").querySelector(".btn-primary").onclick = saveUser;
  const userModal = new bootstrap.Modal(document.getElementById("userModal"));
  userModal.show();
}

function saveUser() {
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  const role = document.getElementById("userRole").value;
  const status = document.getElementById("userStatus").value;
  users.push({ name, email, role, status });
  populateUsers();
  bootstrap.Modal.getInstance(document.getElementById("userModal")).hide();
}

function editUser(index) {
  const user = users[index];
  document.getElementById("userName").value = user.name;
  document.getElementById("userEmail").value = user.email;
  document.getElementById("userRole").value = user.role;
  document.getElementById("userStatus").value = user.status;
  document.getElementById("userModal").querySelector(".btn-primary").onclick = () => {
    users[index] = {
      name: document.getElementById("userName").value,
      email: document.getElementById("userEmail").value,
      role: document.getElementById("userRole").value,
      status: document.getElementById("userStatus").value,
    };
    populateUsers();
    bootstrap.Modal.getInstance(document.getElementById("userModal")).hide();
  };
  const userModal = new bootstrap.Modal(document.getElementById("userModal"));
  userModal.show();
}

function deleteUser(index) {
  users.splice(index, 1);
  populateUsers();
}

// Role Management
function openRoleModal() {
  document.getElementById("roleForm").reset();
  document.getElementById("roleModal").querySelector(".btn-primary").onclick = saveRole;
  const roleModal = new bootstrap.Modal(document.getElementById("roleModal"));
  roleModal.show();
}

function saveRole() {
  const name = document.getElementById("roleName").value;
  const permissions = [];
  if (document.getElementById("readPermission").checked) permissions.push("Read");
  if (document.getElementById("writePermission").checked) permissions.push("Write");
  if (document.getElementById("deletePermission").checked) permissions.push("Delete");
  roles.push({ id: roles.length + 1, name, permissions });
  populateRoles();
  bootstrap.Modal.getInstance(document.getElementById("roleModal")).hide();
}

function editRole(index) {
  const role = roles[index];
  document.getElementById("roleName").value = role.name;
  document.getElementById("readPermission").checked = role.permissions.includes("Read");
  document.getElementById("writePermission").checked = role.permissions.includes("Write");
  document.getElementById("deletePermission").checked = role.permissions.includes("Delete");
  document.getElementById("roleModal").querySelector(".btn-primary").onclick = () => {
    roles[index] = {
      id: role.id,
      name: document.getElementById("roleName").value,
      permissions: [
        ...(document.getElementById("readPermission").checked ? ["Read"] : []),
        ...(document.getElementById("writePermission").checked ? ["Write"] : []),
        ...(document.getElementById("deletePermission").checked ? ["Delete"] : []),
      ],
    };
    populateRoles();
    bootstrap.Modal.getInstance(document.getElementById("roleModal")).hide();
  };
  const roleModal = new bootstrap.Modal(document.getElementById("roleModal"));
  roleModal.show();
}

function deleteRole(index) {
  roles.splice(index, 1);
  populateRoles();
}

// Initialize
populateRoles();
populateUsers();
