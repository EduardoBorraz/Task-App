const d = document;
const $form = d.getElementById("task-form");
const $tasks = d.getElementById("tasks");
const $search = d.getElementById("search");
const $name = d.getElementById("name");
const $description = d.getElementById("description");
const $id = d.getElementById("taskId");

$(document).ready(function () {
  console.log("JQry");

  let edit = false;

  function fetchTasks() {
    $.ajax({
      url: "task-list.php",
      type: "GET",
      success: function (response) {
        const tasks = JSON.parse(response);
        let template = "";
        tasks.forEach((task) => {
          template += `
                  <tr taskId="${task.id}">
                  <td>${task.id}</td>
                  <td>
                  <a>
                    ${task.name} 
                  </a>
                  </td>
                  <td>${task.description}</td>
                  <td>
                    <button class="task-delete btn btn-danger">
                     Delete 
                    </button>
                    <button class="task-edit btn btn-success">
                      Edit
                    </button>
                  </td>
                  </tr>
                `;
        });
        $("#tasks").html(template);
      },
    });
  }

  fetchTasks();

  $("#search").keyup(function (e) {
    if ($("#search").val()) {
      let search = $("#search").val();
      $.ajax({
        url: "task-search.php",
        type: "POST",
        data: { task: search },
        success: function (responseText) {
          if (!responseText.error) {
            console.log(responseText);
          }
        },
      });
    }
  });

  $("#task-form").submit((e) => {
    e.preventDefault();
    const postData = {
      name: $name.value,
      description: $description.value,
      id: $id.value,
    };
    const url = edit === false ? "task-add.php" : "task-edit.php";

    if (postData.name === "" && postData.description === "") {
      alert("Campos Vacios");
    } else {
      $.post(url, postData, (response) => {
        $("#task-form").trigger("reset");
        fetchTasks();
      });
    }
  });

  $(document).on("click", ".task-edit", (e) => {
    e.preventDefault();
    const element = $(this)[0].activeElement.parentElement.parentElement;
    const id = $(element).attr("taskId");

    $.post("task-single.php", { id }, (response) => {
      const task = JSON.parse(response);
      $("#name").val(task.name);
      $("#description").val(task.description);
      $("#taskId").val(task.id);
      edit = true;
    });
  });

  $(document).on("click", ".task-delete", (e) => {
    if (confirm("Are you sure want to delete it?")) {
      const element = $(this)[0].activeElement.parentElement.parentElement;
      const id = $(element).attr("taskId");

      $.post("task-delete.php", { id }, (response) => {
        fetchTasks();
      });
    }
  });
});

//======================//
/*Otro codigo sin usar Jqry === Propuesta*/

/* const ajax = (options) => {
  let { url, method, data, success, error } = options;

  console.log(data);
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log(xhr.responseText);
      let json = JSON.parse(xhr.responseText);
        console.log(json);
      success(json);
    } else {
      let message = xhr.statusText || "Ocurrio un error";
      error(`Error ${xhr.statusText}: ${message}`);
    }
  });

  xhr.open(method || "GET", url);
  xhr.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded; application/json; charset=utf8"
  );
  xhr.send();
};

const getTask = () => {
  ajax({
    url: "task-list.php",
    method: "GET",
    success: (res) => {
      if (!res.error) {
        res.forEach((task) => {
          $tasks.innerHTML += `
                <tr>
                    <td>${task.id}</td>
                    <td>${task.name}</td>
                    <td>${task.description}</td>
                    <td>
                    <button class="task-delete btn btn-danger">
                     Delete 
                    </button>
                  </td>
                </tr>
            `;
        });
      }
    }
  });
};
d.addEventListener("DOMContentLoaded", getTask); */

/* d.addEventListener("keyup", (e) => {
  e.preventDefault();

  if ($search.value) {
    let search = $search.value;
    ajax({
      url: "task-search.php",
      method: "POST",
      data: {task:search},
      success: (res) => {
        console.log(res);
      },
      error: (err) => {
        $task.insertAdjacentHTML(
          "afterend",
          `<p style="color: red;"><b>${err}<b></p>`
        );
      },
    });
  }
}); */

/* d.addEventListener("submit", e => {
  e.preventDefault();
  ajax({
    url: "task-add.php",
    method: "POST",
    data: {
       name : $name.value,
       description: $description.value, 
    },
    success: (res)=>{
      console.log(res);
    }
  });
}); */
/* getTask(); */

/*  */
