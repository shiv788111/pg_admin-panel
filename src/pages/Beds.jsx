import { useEffect, useState } from "react";

import {
  BedDouble,
  Plus,
  Trash2,
  Pencil,
  Search,
  X,
} from "lucide-react";

import {
  getBeds,
  createBed,
  deleteBed,
  updateBed,
} from "../services/beds";

import { getRooms } from "../services/rooms";

function Beds() {
  // ================= STATES =================

  const [beds, setBeds] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // CREATE FORM
  const [formData, setFormData] = useState({
    room_id: "",
    label: "",
    bed_type: "single",
    bed_monthly_rent: "",
  });

  // EDIT MODAL
  const [isEditModalOpen, setIsEditModalOpen] =
    useState(false);

  const [selectedBed, setSelectedBed] =
    useState(null);

  const [editFormData, setEditFormData] =
    useState({
      room_id: "",
      label: "",
      bed_type: "",
      bed_monthly_rent: "",
      status: "",
    });

  // ================= FETCH BEDS =================

  const fetchBeds = async () => {
    try {
      setLoading(true);

      const response = await getBeds();

      setBeds(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH ROOMS =================

  const fetchRooms = async () => {
    try {
      const response = await getRooms();

      setRooms(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= CREATE BED =================

  const handleCreateBed = async (e) => {
    e.preventDefault();

    try {
      await createBed(formData);

      setFormData({
        room_id: "",
        label: "",
        bed_type: "single",
        bed_monthly_rent: "",
      });

      fetchBeds();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= DELETE BED =================

  const handleDelete = async (id) => {
    try {
      await deleteBed(id);

      fetchBeds();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= EDIT CLICK =================

  const handleEditClick = (bed) => {
    setSelectedBed(bed);

    setEditFormData({
      room_id: bed.room_id,
      label: bed.label,
      bed_type: bed.bed_type,
      bed_monthly_rent:
        bed.bed_monthly_rent,
      status: bed.status,
    });

    setIsEditModalOpen(true);
  };

  // ================= UPDATE BED =================

  const handleUpdateBed = async (e) => {
    e.preventDefault();

    try {
      await updateBed(
        selectedBed.bed_id,
        editFormData
      );

      setIsEditModalOpen(false);

      fetchBeds();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= ROOM DETAILS =================

  const getRoomDetails = (roomId) => {
    const room = rooms.find(
      (item) => item.room_id === roomId
    );

    if (!room) return "N/A";

    return `Room ${room.name}`;
  };

  // ================= SEARCH =================

  const filteredBeds = beds.filter((bed) =>
    bed.label
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= INITIAL LOAD =================

  useEffect(() => {
    fetchBeds();
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Bed Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all PG beds and occupancy
          </p>
        </div>

        <button
          className="
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            px-5
            py-3
            rounded-xl
            flex
            items-center
            gap-2
            shadow-lg
            font-medium
            w-fit
          "
        >
          <Plus className="w-5 h-5" />
          Add Bed
        </button>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {/* TOTAL */}

        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Beds
          </p>

          <h2 className="text-3xl font-bold mt-2 text-gray-800">
            {beds.length}
          </h2>
        </div>

        {/* OCCUPIED */}

        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Occupied Beds
          </p>

          <h2 className="text-3xl font-bold mt-2 text-red-500">
            {
              beds.filter(
                (bed) =>
                  bed.status === "occupied"
              ).length
            }
          </h2>
        </div>

        {/* VACANT */}

        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Vacant Beds
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-500">
            {
              beds.filter(
                (bed) =>
                  bed.status === "vacant"
              ).length
            }
          </h2>
        </div>

        {/* REVENUE */}

        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Monthly Revenue
          </p>

          <h2 className="text-3xl font-bold mt-2 text-indigo-600">
            ₹
            {beds.reduce(
              (acc, item) =>
                acc +
                Number(
                  item.bed_monthly_rent || 0
                ),
              0
            )}
          </h2>
        </div>
      </div>

      {/* ================= CREATE FORM ================= */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <BedDouble className="w-6 h-6 text-indigo-600" />

          <h2 className="text-xl font-semibold text-gray-800">
            Create New Bed
          </h2>
        </div>

        <form
          onSubmit={handleCreateBed}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
        >
          {/* ROOM */}

          <div>
            <label className="text-sm font-medium text-gray-600">
              Select Room
            </label>

            <select
              value={formData.room_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  room_id: e.target.value,
                })
              }
              className="
                w-full
                mt-2
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:border-indigo-500
                bg-white
              "
              required
            >
              <option value="">
                Select Room
              </option>

              {rooms.map((room) => (
                <option
                  key={room.room_id}
                  value={room.room_id}
                >
                  Room {room.name} •{" "}
                  {room.room_type} • Floor{" "}
                  {room.floor}
                </option>
              ))}
            </select>
          </div>

          {/* LABEL */}

          <div>
            <label className="text-sm font-medium text-gray-600">
              Bed Label
            </label>

            <input
              type="text"
              placeholder="Bed A"
              value={formData.label}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  label: e.target.value,
                })
              }
              className="
                w-full
                mt-2
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:border-indigo-500
              "
              required
            />
          </div>

          {/* TYPE */}

          <div>
            <label className="text-sm font-medium text-gray-600">
              Bed Type
            </label>

            <select
              value={formData.bed_type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bed_type: e.target.value,
                })
              }
              className="
                w-full
                mt-2
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:border-indigo-500
                bg-white
              "
            >
              <option value="single">
                Single
              </option>

              <option value="bunk_lower">
                Bunk Lower
              </option>

              <option value="bunk_upper">
                Bunk Upper
              </option>

              <option value="mattress">
                Mattress
              </option>
            </select>
          </div>

          {/* RENT */}

          <div>
            <label className="text-sm font-medium text-gray-600">
              Monthly Rent
            </label>

            <input
              type="number"
              placeholder="3500"
              value={formData.bed_monthly_rent}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bed_monthly_rent:
                    e.target.value,
                })
              }
              className="
                w-full
                mt-2
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:border-indigo-500
              "
              required
            />
          </div>

          {/* BUTTON */}

          <div className="xl:col-span-4">
            <button
              type="submit"
              className="
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                px-6
                py-3
                rounded-xl
                shadow-md
                font-medium
              "
            >
              Create Bed
            </button>
          </div>
        </form>
      </div>

      {/* ================= TABLE ================= */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* HEADER */}

        <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Beds List
          </h2>

          {/* SEARCH */}

          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search beds..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                border
                border-gray-300
                rounded-xl
                pl-10
                pr-4
                py-2.5
                outline-none
                focus:border-indigo-500
                w-[250px]
              "
            />
          </div>
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 text-gray-600">
                  Bed ID
                </th>

                <th className="text-left p-4 text-gray-600">
                  Room
                </th>

                <th className="text-left p-4 text-gray-600">
                  Label
                </th>

                <th className="text-left p-4 text-gray-600">
                  Bed Type
                </th>

                <th className="text-left p-4 text-gray-600">
                  Status
                </th>

                <th className="text-left p-4 text-gray-600">
                  Rent
                </th>

                <th className="text-left p-4 text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-10 text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredBeds.length ===
                0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-10 text-gray-500"
                  >
                    No beds found
                  </td>
                </tr>
              ) : (
                filteredBeds.map((bed) => (
                  <tr
                    key={bed.bed_id}
                    className="border-t border-gray-100 hover:bg-gray-50"
                  >
                    {/* ID */}

                    <td className="p-4 font-medium text-gray-700">
                      #{bed.bed_id}
                    </td>

                    {/* ROOM */}

                    <td className="p-4 text-gray-700">
                      {getRoomDetails(
                        bed.room_id
                      )}
                    </td>

                    {/* LABEL */}

                    <td className="p-4 text-gray-700">
                      {bed.label}
                    </td>

                    {/* TYPE */}

                    <td className="p-4 capitalize text-gray-700">
                      {bed.bed_type.replace(
                        "_",
                        " "
                      )}
                    </td>

                    {/* STATUS */}

                    <td className="p-4">
                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold

                          ${
                            bed.status ===
                            "occupied"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }
                        `}
                      >
                        {bed.status}
                      </span>
                    </td>

                    {/* RENT */}

                    <td className="p-4 font-medium text-gray-700">
                      ₹
                      {bed.bed_monthly_rent}
                    </td>

                    {/* ACTIONS */}

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {/* EDIT */}

                        <button
                          onClick={() =>
                            handleEditClick(
                              bed
                            )
                          }
                          className="
                            w-9
                            h-9
                            rounded-lg
                            bg-indigo-50
                            hover:bg-indigo-100
                            flex
                            items-center
                            justify-center
                            text-indigo-600
                          "
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            handleDelete(
                              bed.bed_id
                            )
                          }
                          className="
                            w-9
                            h-9
                            rounded-lg
                            bg-red-50
                            hover:bg-red-100
                            flex
                            items-center
                            justify-center
                            text-red-500
                          "
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}

      {isEditModalOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/40
            flex
            items-center
            justify-center
            z-50
            p-4
          "
        >
          <div
            className="
              bg-white
              w-full
              max-w-2xl
              rounded-3xl
              shadow-2xl
              overflow-hidden
            "
          >
            {/* HEADER */}

            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                Edit Bed
              </h2>

              <button
                onClick={() =>
                  setIsEditModalOpen(false)
                }
                className="
                  w-10
                  h-10
                  rounded-full
                  hover:bg-gray-100
                  flex
                  items-center
                  justify-center
                "
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* BODY */}

            <form
              onSubmit={handleUpdateBed}
              className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {/* ROOM */}

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Select Room
                </label>

                <select
                  value={
                    editFormData.room_id
                  }
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      room_id:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    mt-2
                    border
                    border-gray-300
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:border-indigo-500
                  "
                >
                  {rooms.map((room) => (
                    <option
                      key={room.room_id}
                      value={
                        room.room_id
                      }
                    >
                      Room {room.name} •{" "}
                      {room.room_type}
                    </option>
                  ))}
                </select>
              </div>

              {/* LABEL */}

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Bed Label
                </label>

                <input
                  type="text"
                  value={
                    editFormData.label
                  }
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      label:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    mt-2
                    border
                    border-gray-300
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:border-indigo-500
                  "
                />
              </div>

              {/* TYPE */}

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Bed Type
                </label>

                <select
                  value={
                    editFormData.bed_type
                  }
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      bed_type:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    mt-2
                    border
                    border-gray-300
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:border-indigo-500
                  "
                >
                  <option value="single">
                    Single
                  </option>

                  <option value="bunk_lower">
                    Bunk Lower
                  </option>

                  <option value="bunk_upper">
                    Bunk Upper
                  </option>

                  <option value="mattress">
                    Mattress
                  </option>
                </select>
              </div>

              {/* STATUS */}

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Status
                </label>

                <select
                  value={
                    editFormData.status
                  }
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      status:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    mt-2
                    border
                    border-gray-300
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:border-indigo-500
                  "
                >
                  <option value="vacant">
                    Vacant
                  </option>

                  <option value="occupied">
                    Occupied
                  </option>
                </select>
              </div>

              {/* RENT */}

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600">
                  Monthly Rent
                </label>

                <input
                  type="number"
                  value={
                    editFormData.bed_monthly_rent
                  }
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      bed_monthly_rent:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    mt-2
                    border
                    border-gray-300
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:border-indigo-500
                  "
                />
              </div>

              {/* BUTTONS */}

              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() =>
                    setIsEditModalOpen(
                      false
                    )
                  }
                  className="
                    px-5
                    py-3
                    rounded-xl
                    border
                    border-gray-300
                    text-gray-700
                    hover:bg-gray-100
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    bg-indigo-600
                    hover:bg-indigo-700
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-medium
                  "
                >
                  Update Bed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Beds;