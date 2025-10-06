<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher<{
    close: void;
    logout: void;
    changePassword: { oldPassword: string; newPassword: string };
    changeName: { newName: string };
    deleteAllData: void;
    changeLanguage: { language: 'en' | 'de' | 'pl' };
  }>();

  export let username: string;
  export let currentLanguage: 'en' | 'de' | 'pl';
  
  let showChangePassword = false;
  let showChangeName = false;
  let showDeleteConfirm = false;
  let showChangeLanguage = false;
  
  let oldPassword = '';
  let newPassword = '';
  let confirmPassword = '';
  let newName = '';
  let selectedLanguage: 'en' | 'de' | 'pl' = currentLanguage;
  
  let passwordError = '';
  let nameError = '';
  let nameSuccess = false;
  let deleteSuccess = false;
  let languageSuccess = false;

  function handleChangePassword() {
    passwordError = '';
    
    if (!oldPassword || !newPassword || !confirmPassword) {
      passwordError = 'All password fields are required';
      return;
    }
    
    if (newPassword !== confirmPassword) {
      passwordError = 'New passwords do not match';
      return;
    }
    
    if (newPassword.length < 6) {
      passwordError = 'Password must be at least 6 characters';
      return;
    }
    
    dispatch('changePassword', { oldPassword, newPassword });
    resetPasswordForm();
  }

  function handleChangeName() {
    nameError = '';
    
    if (!newName.trim()) {
      nameError = 'Name cannot be empty';
      return;
    }
    
    dispatch('changeName', { newName: newName.trim() });
    nameSuccess = true;
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      nameSuccess = false;
    }, 3000);
  }

  function handleDeleteAllData() {
    dispatch('deleteAllData');
    deleteSuccess = true;
    showDeleteConfirm = false;
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      deleteSuccess = false;
    }, 3000);
  }

  function handleChangeLanguage() {
    dispatch('changeLanguage', { language: selectedLanguage });
    languageSuccess = true;
    currentLanguage = selectedLanguage;
    
    setTimeout(() => {
      languageSuccess = false;
    }, 3000);
  }

  function resetPasswordForm() {
    oldPassword = '';
    newPassword = '';
    confirmPassword = '';
    passwordError = '';
    showChangePassword = false;
  }

  function resetNameForm() {
    newName = '';
    nameError = '';
    nameSuccess = false;
    showChangeName = false;
  }

  function resetLanguageForm() {
    selectedLanguage = currentLanguage;
    languageSuccess = false;
    showChangeLanguage = false;
  }

  function handleClose() {
    resetPasswordForm();
    resetNameForm();
    resetLanguageForm();
    showDeleteConfirm = false;
    deleteSuccess = false;
    dispatch('close');
  }
</script>

<!-- Settings Modal -->
<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
  <div class="bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
    <!-- Header -->
    <div class="p-6 border-b border-white/20">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94 1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-white">Settings</h2>
            <p class="text-white/70 text-sm">{username}</p>
          </div>
        </div>
        <button 
          on:click={handleClose}
          class="p-2 text-white/60 hover:text-white/80 hover:bg-white/10 rounded-lg transition-all duration-200"
          aria-label="Close settings"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Settings Options -->
    <div class="p-6 space-y-4">
      
      <!-- Change Language -->
      {#if !showChangeLanguage}
        <button 
          on:click={() => { showChangeLanguage = true; selectedLanguage = currentLanguage; }}
          class="w-full p-4 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all duration-200 text-left group"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/25 transition-colors duration-200">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.657-6.657l-1.414 1.414M7.757 16.243l-1.414 1.414m10.314 0l-1.414-1.414M7.757 7.757L6.343 6.343"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-white font-medium">Change Language</h3>
              <p class="text-white/60 text-sm">Set app language for questions</p>
            </div>
          </div>
        </button>
      {:else}
        <div class="p-4 bg-white/10 border border-white/20 rounded-xl">
          <h3 class="text-white font-medium mb-3">Change Language</h3>
          <div class="space-y-3">
            <label class="block text-white/80 text-sm mb-1">Language</label>
            <select
              bind:value={selectedLanguage}
              class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200"
            >
              <option value="en">English</option>
              <option value="de">Deutsch</option>
              <option value="pl">Polski</option>
            </select>
            {#if languageSuccess}
              <div class="flex items-center gap-2 text-green-300 text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Language updated!
              </div>
            {/if}
            <div class="flex gap-2">
              <button 
                on:click={handleChangeLanguage}
                class="px-4 py-2 bg-[#0C6E78] hover:bg-[#0A5A63] text-white rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                Save
              </button>
              <button 
                on:click={resetLanguageForm}
                class="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors duration-200 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      {/if}
      
      <!-- Change Name -->
      {#if !showChangeName}
        <button 
          on:click={() => { showChangeName = true; newName = username; }}
          class="w-full p-4 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all duration-200 text-left group"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/25 transition-colors duration-200">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-white font-medium">Change Name</h3>
              <p class="text-white/60 text-sm">Update your display name</p>
            </div>
          </div>
        </button>
      {:else}
        <div class="p-4 bg-white/10 border border-white/20 rounded-xl">
          <h3 class="text-white font-medium mb-3">Change Name</h3>
          <div class="space-y-3">
            <input
              type="text"
              bind:value={newName}
              placeholder="Enter new name"
              class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200"
            />
            {#if nameError}
              <p class="text-red-300 text-sm">{nameError}</p>
            {/if}
            {#if nameSuccess}
              <div class="flex items-center gap-2 text-green-300 text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Name updated successfully!
              </div>
            {/if}
            <div class="flex gap-2">
              <button 
                on:click={handleChangeName}
                class="px-4 py-2 bg-[#0C6E78] hover:bg-[#0A5A63] text-white rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                Save
              </button>
              <button 
                on:click={resetNameForm}
                class="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors duration-200 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      {/if}

      <!-- Change Password -->
      {#if !showChangePassword}
        <button 
          on:click={() => showChangePassword = true}
          class="w-full p-4 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all duration-200 text-left group"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/25 transition-colors duration-200">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-white font-medium">Change Password</h3>
              <p class="text-white/60 text-sm">Update your account password</p>
            </div>
          </div>
        </button>
      {:else}
        <div class="p-4 bg-white/10 border border-white/20 rounded-xl">
          <h3 class="text-white font-medium mb-3">Change Password</h3>
          <div class="space-y-3">
            <input
              type="password"
              bind:value={oldPassword}
              placeholder="Current password"
              class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200"
            />
            <input
              type="password"
              bind:value={newPassword}
              placeholder="New password"
              class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200"
            />
            <input
              type="password"
              bind:value={confirmPassword}
              placeholder="Confirm new password"
              class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0C6E78] focus:border-[#0C6E78] transition-all duration-200"
            />
            {#if passwordError}
              <p class="text-red-300 text-sm">{passwordError}</p>
            {/if}
            <div class="flex gap-2">
              <button 
                on:click={handleChangePassword}
                class="px-4 py-2 bg-[#0C6E78] hover:bg-[#0A5A63] text-white rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                Update
              </button>
              <button 
                on:click={resetPasswordForm}
                class="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors duration-200 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      {/if}

      <!-- Delete All Data -->
      {#if deleteSuccess}
        <div class="p-4 bg-green-500/20 border border-green-400/30 rounded-xl">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-green-500/30 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-green-200 font-medium">Data Deleted Successfully</h3>
              <p class="text-green-300/70 text-sm">All your answers have been removed</p>
            </div>
          </div>
        </div>
      {:else if !showDeleteConfirm}
        <button 
          on:click={() => showDeleteConfirm = true}
          class="w-full p-4 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 rounded-xl transition-all duration-200 text-left group"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-red-500/30 rounded-lg flex items-center justify-center group-hover:bg-red-500/40 transition-colors duration-200">
              <svg class="w-5 h-5 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-red-200 font-medium">Delete All Data</h3>
              <p class="text-red-300/70 text-sm">Permanently remove all your answers</p>
            </div>
          </div>
        </button>
      {:else}
        <div class="p-4 bg-red-500/20 border border-red-400/30 rounded-xl">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-red-500/30 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-red-200 font-medium">Are you sure?</h3>
              <p class="text-red-300/70 text-sm">This action cannot be undone</p>
            </div>
          </div>
          <div class="flex gap-2">
            <button 
              on:click={handleDeleteAllData}
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Delete All
            </button>
            <button 
              on:click={() => showDeleteConfirm = false}
              class="px-4 py-2 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors duration-200 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      {/if}

      <!-- Logout -->
      <button 
        on:click={() => dispatch('logout')}
        class="w-full p-4 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all duration-200 text-left group"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/25 transition-colors duration-200">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-white font-medium">Logout</h3>
            <p class="text-white/60 text-sm">Sign out of your account</p>
          </div>
        </div>
      </button>
    </div>
  </div>
</div>