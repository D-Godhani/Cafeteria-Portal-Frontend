"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  MessageSquare,
  Settings,
  MessageCircle, // Added for Header
  HelpCircle, // Added for Input
  Filter,
} from "lucide-react";
import {
  getCanteenFeedbackResponses,
  addFeedbackQuestion,
  updateFeedbackQuestion,
  deleteFeedbackQuestion,
  getFeedbackQuestions,
  FeedbackResponse,
  FeedbackQuestion,
} from "@/services/adminService";
import { getPublicCanteens, Canteen } from "@/services/publicService";

export default function AdminFeedbackPage() {
  const router = useRouter();

  // State
  const [canteens, setCanteens] = useState<Canteen[]>([]);
  const [selectedCanteenId, setSelectedCanteenId] = useState<any>("");

  const [activeTab, setActiveTab] = useState<"responses" | "questions">(
    "responses"
  );
  const [responses, setResponses] = useState<FeedbackResponse[]>([]);
  const [questions, setQuestions] = useState<FeedbackQuestion[]>([]);
  const [loading, setLoading] = useState(false);

  // Form State for Questions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] =
    useState<FeedbackQuestion | null>(null);
  const [questionText, setQuestionText] = useState("");

  // 1. Load Canteens on Mount
  useEffect(() => {
    const fetchCanteens = async () => {
      try {
        const data = await getPublicCanteens();
        setCanteens(data);
        if (data.length > 0) setSelectedCanteenId(data[0].id);
      } catch (error) {
        console.error("Error fetching canteens", error);
      }
    };
    fetchCanteens();
  }, []);

  // 2. Fetch Data when Canteen or Tab changes
  useEffect(() => {
    if (!selectedCanteenId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === "responses") {
          const data = await getCanteenFeedbackResponses(selectedCanteenId);
          setResponses(data);
        } else {
          const data = await getFeedbackQuestions(selectedCanteenId);
          setQuestions(data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
        if (activeTab === "questions") setQuestions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCanteenId, activeTab]);

  // --- HANDLERS ---

  const handleSaveQuestion = async () => {
    if (!questionText.trim()) return;
    try {
      if (editingQuestion) {
        await updateFeedbackQuestion(
          editingQuestion.id,
          selectedCanteenId,
          questionText
        );
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === editingQuestion.id ? { ...q, questionText } : q
          )
        );
      } else {
        const newQ = await addFeedbackQuestion(selectedCanteenId, questionText);
        setQuestions((prev) => [...prev, newQ]);
      }
      setIsModalOpen(false);
      setQuestionText("");
      setEditingQuestion(null);
    } catch (error) {
      alert("Failed to save question");
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    if (
      !confirm(
        "Delete this question? User responses linked to it might be lost."
      )
    )
      return;
    try {
      await deleteFeedbackQuestion(id);
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (error) {
      alert("Failed to delete question");
    }
  };

  const openModal = (question?: FeedbackQuestion) => {
    if (question) {
      setEditingQuestion(question);
      setQuestionText(question.questionText);
    } else {
      setEditingQuestion(null);
      setQuestionText("");
    }
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            onClick={() => router.back()}
            className="btn btn-circle btn-ghost"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <MessageCircle className="w-8 h-8 text-purple-500" />
              User Feedback
            </h1>
            <p className="text-base-content/70">
              Analyze ratings and suggestions.
            </p>
          </div>
        </div>

        {/* Canteen Selector */}
        <div className="flex items-center gap-3 w-full md:w-auto bg-base-100 p-2 rounded-xl shadow-sm border border-base-200">
          <Filter className="w-5 h-5 text-base-content/50 ml-2" />
          <select
            className="select select-sm select-ghost w-full md:w-64 focus:bg-transparent"
            value={selectedCanteenId}
            onChange={(e) => setSelectedCanteenId(e.target.value)}
          >
            {canteens.map((c) => (
              <option key={c.id} value={c.id}>
                {c.canteenName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* --- Modern Tabs --- */}
      <div className="bg-base-200/60 p-1 rounded-xl inline-flex gap-1 mb-6">
        <button
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === "responses"
              ? "bg-white text-purple-600 shadow-sm ring-1 ring-black/5"
              : "text-base-content/60 hover:text-base-content hover:bg-base-200"
          }`}
          onClick={() => setActiveTab("responses")}
        >
          <MessageSquare className="w-4 h-4" />
          User Responses
        </button>
        <button
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === "questions"
              ? "bg-white text-purple-600 shadow-sm ring-1 ring-black/5"
              : "text-base-content/60 hover:text-base-content hover:bg-base-200"
          }`}
          onClick={() => setActiveTab("questions")}
        >
          <Settings className="w-4 h-4" />
          Manage Questions
        </button>
      </div>

      {/* --- TAB CONTENT: RESPONSES --- */}
      {activeTab === "responses" && (
        <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg text-purple-500"></span>
              </div>
            ) : (
              <table className="table table-zebra w-full">
                <thead className="bg-base-200/50">
                  <tr>
                    <th>Date</th>
                    <th>Student ID</th>
                    <th>Question</th>
                    <th>Response / Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {responses.map((res) => (
                    <tr key={res.responseId} className="hover">
                      <td>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {new Date(res.createdAt).toLocaleDateString()}
                          </span>
                          <span className="text-xs opacity-50">
                            {new Date(res.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="font-mono text-sm">{res.studentId}</td>
                      <td
                        className="font-medium text-base-content/80 max-w-xs truncate"
                        title={res.questionText}
                      >
                        {res.questionText}
                      </td>
                      <td>
                        {res.rating ? (
                          <div className="rating rating-sm rating-disabled gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <input
                                key={star}
                                type="radio"
                                className={`mask mask-star-2 ${
                                  (res.rating || 0) >= star
                                    ? "bg-orange-400"
                                    : "bg-base-300"
                                }`}
                                checked={res.rating === star}
                                readOnly
                              />
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm italic text-base-content/70">
                            &quot;{res.answerText || "-"}&quot;
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {responses.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-16">
                        <MessageSquare className="w-12 h-12 text-base-content/20 mx-auto mb-3" />
                        <p className="opacity-50">No feedback responses yet.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* --- TAB CONTENT: MANAGE QUESTIONS --- */}
      {activeTab === "questions" && (
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">Survey Questions</h2>
                <p className="text-sm text-base-content/60">
                  Customize what you ask students
                </p>
              </div>
              <button
                className="btn btn-primary btn-sm gap-2 shadow-md"
                onClick={() => openModal()}
              >
                <Plus className="w-4 h-4" /> Add Question
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-10">
                <span className="loading loading-spinner text-purple-500"></span>
              </div>
            ) : (
              <div className="grid gap-3">
                {questions.map((q) => (
                  <div
                    key={q.id}
                    className="flex justify-between items-center p-4 bg-base-200/50 hover:bg-base-200 rounded-xl border border-transparent hover:border-base-300 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">
                        Q{q.id}
                      </span>
                      <span className="font-medium text-lg">
                        {q.questionText}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className="btn btn-square btn-ghost btn-sm text-blue-500 hover:bg-blue-50"
                        onClick={() => openModal(q)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost btn-sm text-red-500 hover:bg-red-50"
                        onClick={() => handleDeleteQuestion(q.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {questions.length === 0 && (
                  <div className="text-center py-16 border-2 border-dashed border-base-300 rounded-xl">
                    <Settings className="w-12 h-12 text-base-content/20 mx-auto mb-3" />
                    <p className="opacity-50">
                      No questions configured for this canteen yet.
                    </p>
                    <button
                      className="btn btn-link btn-sm text-purple-500 mt-2"
                      onClick={() => openModal()}
                    >
                      Create first question
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="modal modal-open backdrop-blur-sm">
          <div className="modal-box">
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>

            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              {editingQuestion ? (
                <Edit2 className="w-5 h-5 text-blue-500" />
              ) : (
                <Plus className="w-5 h-5 text-purple-500" />
              )}
              {editingQuestion ? "Edit Question" : "New Survey Question"}
            </h3>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Question Text</span>
              </label>
              <div className="relative">
                <HelpCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 focus:input-primary"
                  placeholder="e.g. Rate the hygiene on a scale of 1-5..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  autoFocus
                />
              </div>
              <label className="label">
                <span className="label-text-alt opacity-60">
                  Users will be able to rate 1-5 stars or leave text.
                </span>
              </label>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSaveQuestion}>
                Save Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
